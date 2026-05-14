
import {lifecycle} from "@benev/archimedes"
import {Pod} from "../parts/pod.js"
import {selrect} from "../utils/selrect.js"
import {getRect} from "../utils/get-rect.js"

export const target_lattice = (pod: Pod) => lifecycle(
	pod.entities,
	["targetable", "position", "size"],
	(id, components) => {
		let rect = getRect(components)
		pod.targetLattice.upsert(id, rect)

		return {
			tick(components) {
				const freshRect = getRect(components)
				if (!rect.equals(freshRect)) {
					rect = freshRect
					pod.targetLattice.upsert(id, rect)
				}
			},
			exit() {
				pod.targetLattice.remove(id)
			},
		}
	},
)

export const targeting = (pod: Pod) => () => {
	for (const [id, components] of pod.entities.select("targets", "position", "reach", "rotation")) {
		const targets = [...pod.targetLattice.query(selrect(components))]
		pod.change.merge(id, {targets})
	}
}

