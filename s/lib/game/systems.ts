
import {Circle, Rect, Vec2} from "@benev/math"
import {asSystems, lifecycle} from "@benev/archimedes"

import {Space} from "./parts/space.js"
import {Phys, PhysBox} from "./utils/phys.js"
import {TileKind} from "../gridworld/types.js"
import {GameComponents} from "./parts/components.js"
import {Gridspace} from "../gridworld/utils/gridspace.js"
import {Gridchunk} from "../gridworld/chunk/gridchunk.js"

export const systems = (space: Space) => asSystems<GameComponents>(change => [
	function update_delta_time() {
		space.timing.update()
	},

	lifecycle(space.entities, ["gridchunk", "position"], (id, components) => {
		const chunk = new Gridchunk(new Gridspace().from(components.position))
		const phys = new Set<Phys>()

		function dumpPhysics() {
			for (const p of phys)
				space.physicsLattice.remove(p)
			phys.clear()
		}

		function addPhysics() {
			for (const {tile, position} of chunk) {
				if (tile !== TileKind.Floor) {
					const obstacle = new PhysBox(
						id,
						new Rect(position, position.dup().add_(1, 1)),
						undefined,
					)
					space.physicsLattice.upsert(obstacle, obstacle.rect)
					phys.add(obstacle)
				}
			}
		}

		return {
			tick(components) {
				const changed = chunk.hex !== components.gridchunk
				if (changed) {
					chunk.hex = components.gridchunk
					dumpPhysics()
					addPhysics()
				}
			},
			exit() {
				dumpPhysics()
			},
		}
	}),

	lifecycle(space.entities, ["physical", "position", "size"], (id, components) => {
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
	}),

	function control_force() {
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
	},

	function forces() {
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
	},
])

