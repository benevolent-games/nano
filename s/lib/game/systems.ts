
import {lifecycle} from "@benev/archimedes"
import {Circular, degrees, Vec2} from "@benev/math"

import {gsys} from "./utils/gsys.js"
import {Phys, PhysBox} from "./utils/phys.js"
import {getShape} from "./utils/get-shape.js"
import {makeRobot} from "./archetypes/robot.js"
import {Gridphys} from "./systems/utils/gridphys.js"
import {Gridspace} from "../gridworld/utils/gridspace.js"

export const systems = [
	gsys("timing", (space) => () => {
		space.timing.update()
	}),

	gsys("phys grid", (space) => lifecycle(
		space.entities,
		["gridchunk", "position"],
		(id, components) => {
			const position = new Gridspace().from(components.position)
			const gridphys = new Gridphys(space.physLattice, id, position)
			return {
				tick: (components) => gridphys.update(components.gridchunk),
				exit: () => gridphys.dump(),
			}
		},
	)),

	gsys("phys bodies", (space) => lifecycle(
		space.entities,
		["physical", "position"],
		(id, components) => {
			const shape = getShape(components)
			if (!shape) throw new Error(`physical with position lacks required size or radius`)

			const rect = shape.boundingBox()
			const phys = new PhysBox(id, rect, components.mass)
			space.physLattice.upsert(phys, rect)

			return {
				tick(components) {
					const freshShape = getShape(components)
					if (!freshShape) throw new Error(`physical with position lacks required size or radius`)
					const freshRect = freshShape.boundingBox()
					if (!phys.rect.equals(freshRect)) {
						phys.rect = freshRect
						space.physLattice.upsert(phys, phys.rect)
					}
				},
				exit() {
					space.physLattice.remove(phys)
				},
			}
		},
	)),

	gsys("user inputs", (space, change) => () => {
		// lifecycling for player entities based on players map
		if (space.players) {

			// add fresh players
			for (const [id, playerIntents] of space.players) {
				const intents = playerIntents.take()
				if (space.entities.has(id)) change.merge(id, {intents})
				else change.set(id, {intents})
			}

			// delete stale players
			for (const [playerId] of space.entities.select("intents")) {
				if (!space.players.has(playerId)) {

					// delete player entity
					change.delete(playerId)

					// delete any robots this player owns
					for (const [id2, c] of space.entities.select("controlledBy")) {
						if (c.controlledBy === playerId)
							change.delete(id2)
					}
				}
			}
		}

		// resolving actions
		for (const [id, {intents}] of space.entities.select("intents")) {
			space.actors.getActor(id).resolveActions(intents)
		}

		const playersThatAreAlive = [...space.entities.select("controlledBy")]
			.map(([,c]) => c.controlledBy)

		// spawn robots
		for (const [controlledBy] of space.entities.select("intents")) {
			if (playersThatAreAlive.includes(controlledBy)) continue
			const actor = space.actors.need(controlledBy)
			if (actor.actions.spectator.spawn.changedDown)
				change.create({...makeRobot(), controlledBy})
		}

		// apply actions to various components
		for (const [id, components] of space.entities.select("controlledBy")) {
			if (!components.controlledBy) continue
			const actor = space.actors.need(components.controlledBy)
			const a = actor.actions.robot

			if ("desire" in components) {
				const x = a.move_right.value - a.move_left.value
				const y = a.move_down.value - a.move_up.value
				const desire = new Gridspace(x, y)
					.clampMagnitude(1)
					.rotate(components.swivel ?? 0)
				change.merge(id, {desire: desire.array()})

				if ("rotation" in components) {
					if (desire.magnitude() > 0.1) {
						const target = degrees(270) - desire.rotation()
						const rotation = Circular.lerp(components.rotation ?? 0, target, components.lerp ?? 1)
						change.merge(id, {rotation})
					}
				}
			}

			if ("rotation" in components && !components.sprint) {
				const x = a.look_left.value - a.look_right.value
				const y = a.look_down.value - a.look_up.value
				const lookIntent = new Gridspace(x, y)
					.clampMagnitude(1)
					.rotate(components.swivel ?? 0)
				if (lookIntent.magnitude() > 0.1) {
					const rotation = lookIntent.rotation()
					change.merge(id, {rotation})
				}
			}

			if ("sprint" in components) {
				change.merge(id, {sprint: !!a.sprint.value})
			}
		}
	}),

	gsys("resolve intent to velocity", (space, change) => () => {
		for (const [id, components] of space.entities.select(
				"controlledBy", "velocity", "desire", "speed", "mass",
			)) {

			const velocity = Vec2.from(components.desire)
				.mulBy(components.speed)
				.mulBy(components.sprint && components.sprintFactor || 1)
				.divBy(components.mass ?? 1)
				.array()

			change.merge(id, {velocity})
		}
	}),

	gsys("forces physical", (space, change) => () => {
		for (const [id, components] of space.entities.select(
				"velocity", "position",
			)) {

			const velocity = Vec2
				.from(components.velocity)
				.mulBy(space.timing.delta / 1000)


			const hit = (physes: Iterable<Phys>) => {
				for (const phys of physes)
					if (phys.id !== id)
						return true
				return false
			}

			const canMoveTo = (position: Vec2) => {
				if (!components.physical) return true
				const shape = getShape({position: position.array(), size: components.size, radius: components.radius})
				if (shape) return !hit(space.physLattice.query(shape.boundingBox()))
				return true
			}

			const original = Vec2.from(components.position)
			let position = original.dup()

			// attempt x
			{
				const next = position.dup().add(new Vec2(velocity.x, 0))
				if (canMoveTo(next))
					position = next
			}

			// attempt y
			{
				const next = position.dup().add(new Vec2(0, velocity.y))
				if (canMoveTo(next))
					position = next
			}

			if (!position.equals(original))
				change.merge(id, {position: position.array()})
		}
	}),
]

