
import {lifecycle} from "@benev/archimedes"
import {Circle, Rect, Vec2} from "@benev/math"
import {makeActionsResolver} from "@benev/tact"

import {gsys} from "./utils/gsys.js"
import {Actor} from "./utils/actor.js"
import {bindings} from "./parts/bindings.js"
import {Phys, PhysBox} from "./utils/phys.js"
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
		["physical", "position", "size"],
		(id, components) => {
			const rect = Rect.fromCenter(Vec2.from(components.position), Vec2.from(components.size))
			const phys = new PhysBox(id, rect, components.mass)
			space.physLattice.upsert(phys, rect)

			return {
				tick(components) {
					const position = Vec2.from(components.position)
					const size = Vec2.from(components.size)
					const freshRect = Rect.fromCenter(position, size)
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
		// update player intents
		const playerIntents = space.getPlayerIntents()
		if (playerIntents) {

			// add fresh players
			for (const [id, intents] of playerIntents) {
				if (space.entities.has(id))
					change.set(id, {intents})
			}

			// delete stale players
			for (const [id] of space.entities.select("intents")) {
				if (!playerIntents.has(id))
					change.delete(id)
			}
		}

		// resolve player intents into actions
		for (const [id, {intents}] of space.entities.select("intents")) {
			space.actors
				.guarantee(id, () => {
					const resolveActions = makeActionsResolver(bindings)
					return new Actor(resolveActions, resolveActions([]))
				})
				.resolveActions(intents)
		}

		const playersThatAreAlive = [...space.entities.select("controlledBy")]
			.map(([,c]) => c.controlledBy)

		// spawn robots
		for (const [id] of space.entities.select("intents")) {
			const actor = space.actors.need(id)
			if (actor.actions.spectate.spawn.changedDown && !playersThatAreAlive.includes(id)) {
				change.create({
					controlledBy: id,
					graphic: "robot",
					desire: [0, 0],
					position: [0, 0],
					physical: true,
					radius: 0.4,
					mass: 1,
					lerp: 0.4,
					velocity: [0, 0],
					speed: 5,
				})
			}
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
					.array()
				change.merge(id, {desire})
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

			const original = Vec2.from(components.position)
			const position = original.dup().add(velocity)

			const hit = (physes: Iterable<Phys>) => {
				for (const phys of physes)
					if (phys.id !== id)
						return true
				return false
			}

			if (components.physical) {
				if (components.size) {
					const size = Vec2.from(components.size)
					const rect = Rect.fromCenter(position, size)
					const collision = space.physLattice.query(rect)
					if (!hit(collision))
						change.merge(id, {position: position.array()})
				}
				else if (components.radius) {
					const circle = new Circle(position, components.radius)
					const collision = space.physLattice.query(circle.boundingBox())
					if (!hit(collision))
						change.merge(id, {position: position.array()})
				}
				else {
					change.merge(id, {position: position.array()})
				}
			}
			else {
				change.merge(id, {position: position.array()})
			}
		}
	}),
]

