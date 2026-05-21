
import {got} from "@e280/stz"
import {Vec2} from "@benev/math"
import {Id} from "@benev/archimedes"

import {Pod} from "../parts/pod.js"
import {selrect} from "../utils/selrect.js"

export const target_assignment = (pod: Pod) => () => {
	for (const [id, components] of pod.entities.select("target", "position", "reach", "rotation")) {
		const targets = [...pod.targetLattice.query(selrect(components))]
		const reticuleCenter = selrect(components).center()

		let target: Id | null = null
		let nearestD2 = Infinity

		for (const id of targets) {
			const targetComponents = got(pod.entities.getWith(id, "position"))
			const targetablePosition = Vec2.from(targetComponents.position)
			const d2 = reticuleCenter.distanceSquared(targetablePosition)
			if (d2 < nearestD2) {
				target = id
				nearestD2 = d2
			}
		}

		if (target !== components.target)
			pod.change.merge(id, {target})
	}
}

