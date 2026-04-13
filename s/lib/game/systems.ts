
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
			const gridphys = new Gridphys(space.physicsLattice, id, position)
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
			space.physicsLattice.upsert(phys, rect)

			return {
				tick(components) {
					const position = Vec2.from(components.position)
					const size = Vec2.from(components.size)
					const freshRect = Rect.fromCenter(position, size)
					if (!phys.rect.equals(freshRect)) {
						phys.rect = freshRect
						space.physicsLattice.upsert(phys, phys.rect)
					}
				},
				exit() {
					space.physicsLattice.remove(phys)
				},
			}
		},
	)),

	gsys("forces controllable", (space, change) => () => {
		for (const [id, components] of space.entities.select("controllable", "speed", "force")) {
			const a = space.actions.control

			const intent = new Gridspace()
				.add_(
					a.move_right.value - a.move_left.value,
					a.move_down.value - a.move_up.value,
				)
				.clampMagnitude(1)

			const accel = intent
				.mulBy(components.speed)
				.divBy(components.mass ?? 1)

			const force = Vec2.from(components.force)
				.lerp(accel, components.lerp ?? 1)

			change.merge(id, {force: force.array()})
		}
	}),

	gsys("forces physical", (space, change) => () => {
		for (const [id, components] of space.entities.select("controllable", "force", "position")) {
			const velocity = Vec2
				.from(components.force)
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
					const collision = space.physicsLattice.query(rect)
					if (!hit(collision))
						change.merge(id, {position: position.array()})
				}
				else if (components.radius) {
					const circle = new Circle(position, components.radius)
					const collision = space.physicsLattice.query(circle.boundingBox())
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

