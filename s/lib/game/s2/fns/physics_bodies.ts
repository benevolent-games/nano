
import {lifecycle} from "@benev/archimedes"
import {system} from "../utils/system.js"
import {PhysBox} from "../../utils/phys.js"
import {getShape} from "../../utils/get-shape.js"

export const physics_bodies = system(weave => lifecycle(
	weave.entities,
	["physical", "position"],
	(id, components) => {
		const shape = getShape(components)
		if (!shape) throw new Error(`physical with position lacks required size or radius`)

		const rect = shape.boundingBox()
		const phys = new PhysBox(id, rect, components.mass)
		weave.physLattice.upsert(phys, rect)

		return {
			tick(components) {
				const freshShape = getShape(components)
				if (!freshShape) throw new Error(`physical with position lacks required size or radius`)
				const freshRect = freshShape.boundingBox()
				if (!phys.rect.equals(freshRect)) {
					phys.rect = freshRect
					weave.physLattice.upsert(phys, phys.rect)
				}
			},
			exit() {
				weave.physLattice.remove(phys)
			},
		}
	},
))

