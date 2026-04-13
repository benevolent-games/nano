
import {Rect, Vec2} from "@benev/math"
import {asSystems, lifecycle} from "@benev/archimedes"

import {Space} from "./parts/space.js"
import {Phys, PhysBox} from "./utils/phys.js"
import {TileKind} from "../gridworld/types.js"
import {GameComponents} from "./parts/components.js"
import {Gridspace} from "../gridworld/utils/gridspace.js"
import {Gridchunk} from "../gridworld/chunk/gridchunk.js"

export const systems = (space: Space) => asSystems<GameComponents>(change => [
	lifecycle(space.entities, ["gridchunk", "position"], (_id, components) => {
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
					const obstacle = new PhysBox(new Rect(position, position.dup().add_(1, 1)))
					space.physicsLattice.upsert(obstacle, obstacle.rect)
					phys.add(obstacle)
				}
			}
		}

		return {
			tick(_id, components) {
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

	function movement() {
		const a = space.actions.control
		const speed = 0.5

		const intent = new Gridspace(0, 0)
			.add_(
				a.move_right.value - a.move_left.value,
				a.move_down.value - a.move_up.value,
			)
			.clampMagnitude(1)
			.mulBy(speed)

		for (const [id, components] of space.entities.select("controllable", "position")) {
			const originalPosition = Vec2.from(components.position)
			const position = originalPosition.dup().add(intent).array()
			change.merge(id, {position})
		}
	},
])

