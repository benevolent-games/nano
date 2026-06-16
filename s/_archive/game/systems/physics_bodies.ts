
import {lifecycle} from "@benev/archimedes"
import {Pod} from "../parts/pod.js"
import {PhysBox} from "../utils/phys.js"
import {getRect} from "../utils/get-rect.js"

export const physics_bodies = (pod: Pod) => lifecycle(
	pod.entities,
	["physical", "position", "size"],
	(id, components) => {
		const rect = getRect(components)
		const phys = new PhysBox(id, rect, components.mass)
		pod.physLattice.upsert(phys, rect)

		return {
			tick(components) {
				const freshRect = getRect(components)
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
)

