
import {got} from "@e280/stz"
import {lifecycle} from "@benev/archimedes"
import {Pod} from "../parts/pod.js"
import {selrect} from "../utils/selrect.js"
import {getShape} from "../utils/get-shape.js"

export const target_lattice = (pod: Pod) => lifecycle(
	pod.entities,
	["targetable", "position", "size"],
	(id, components) => {
		let rect = got(getShape(components)).boundingBox()
		pod.targetLattice.upsert(id, rect)
		console.log("lattice", pod.targetLattice.count)

		return {
			tick(components) {
				const freshRect = got(getShape(components)).boundingBox()
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
		console.log(targets.length)
		pod.change.merge(id, {targets})
	}
}

