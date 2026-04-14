
import {Circle, Rect, Vec2} from "@benev/math"
import {lifecycle} from "@benev/archimedes"

import {gsys} from "./utils/gsys.js"
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
		const a = space.actions.control

		for (const [id] of space.entities.select("controllable", "intent")) {
			const x = a.move_right.value - a.move_left.value
			const y = a.move_down.value - a.move_up.value
			const intent = new Gridspace(x, y)
				.clampMagnitude(1)
				.array()
			change.merge(id, {intent})
		}

		for (const [id] of space.entities.select("controllable", "sprint")) {
			change.merge(id, {sprint: !!a.sprint.value})
		}
	}),

	gsys("resolve intent to velocity", (space, change) => () => {
		for (const [id, components] of space.entities.select(
				"controllable", "velocity", "intent", "speed", "mass",
			)) {

			const velocityTarget = Vec2.from(components.intent)
				.mulBy(components.speed)
				.mulBy(components.sprint && components.sprintFactor || 1)
				.divBy(components.mass ?? 1)

			const velocity = Vec2.from(components.velocity)
				.lerp(velocityTarget, components.lerp ?? 1)
				.array()

			change.merge(id, {velocity})
		}
	}),

	gsys("forces physical", (space, change) => () => {
		for (const [id, components] of space.entities.select(
				"controllable", "velocity", "position",
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

