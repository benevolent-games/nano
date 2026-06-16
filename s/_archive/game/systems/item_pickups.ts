
import {Pod} from "../parts/pod.js"

export const item_pickups = (pod: Pod) => () => {
	for (const [id, components] of pod.entities.select("wishInteractor", "inventory", "inventoryCapacity", "target")) {
		const targetId = components.target
		const underCapacity = components.inventory.length < components.inventoryCapacity
		const pressedButton = components.wishInteractor.pickup

		if (targetId && pressedButton && underCapacity) {
			const targetComponents = pod.entities.getWith(targetId, "pickupable")
			if (targetComponents) {
				pod.change.merge(id, {inventory: [...components.inventory, targetId]})
				pod.change.merge(targetId, {containerId: id})
				pod.change.drop(targetId, "pickupable", "targetable")
			}
		}
	}
}

