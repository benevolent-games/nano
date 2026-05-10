
import {lifecycle} from "@benev/archimedes"
import {Pod} from "../parts/pod.js"
import {PhysBox} from "../utils/phys.js"
import {asSystem} from "../../tools/ecs-plus/as-system.js"
import {getShape} from "../utils/get-shape.js"

export const physics_bodies = asSystem<Pod>(pod => lifecycle(
	pod.entities,
	["physical", "position"],
	(id, components) => {
		const shape = getShape(components)
		if (!shape) throw new Error(`physical with position lacks required size or radius`)

		const rect = shape.boundingBox()
		const phys = new PhysBox(id, rect, components.mass)
		pod.physLattice.upsert(phys, rect)

		return {
			tick(components) {
				const freshShape = getShape(components)
				if (!freshShape) throw new Error(`physical with position lacks required size or radius`)
				const freshRect = freshShape.boundingBox()
				if (!phys.rect.equals(freshRect)) {
					phys.rect = freshRect
					pod.physLattice.upsert(phys, phys.rect)
				}
			},
			exit() {
				pod.physLattice.remove(phys)
			},
		}
	},
))

