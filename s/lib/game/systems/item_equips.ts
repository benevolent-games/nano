
import {Pod} from "../parts/pod.js"

export const item_equips = (pod: Pod) => () => {
	for (const [id, components] of pod.entities.select("wishInteractor", "target")) {
		const targetId = components.target
		const pressedButton = components.wishInteractor.use

		if (targetId && pressedButton) {
			// const targetComponents = pod.entities.getWith(targetId, "pickupable")
			// if (targetComponents) {
			// 	pod.change.merge(id, {inventory: [...components.inventory, targetId]})
			// 	pod.change.merge(targetId, {containerId: id})
			// 	pod.change.drop(targetId, "pickupable", "targetable")
			// }
		}
	}
}

