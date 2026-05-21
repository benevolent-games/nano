//
// import {need} from "@e280/stz"
// import {Pod} from "../parts/pod.js"
//
// export const pickups = (pod: Pod) => () => {
// 	for (const [id, components] of pod.entities.select("inventory", "target", "controlledBy")) {
// 		const targetId = components.target
// 		const a = need(pod.actors, components.controlledBy).actions.mech
// 		const underCapacity = components.inventory.items.length < components.inventory.capacity
//
// 		if (targetId && a.pickup.changedDown && underCapacity) {
// 			console.log("PICKUP", targetId)
// 			const targetComponents = pod.entities.getWith(targetId, "pickupable")
// 			if (targetComponents) {
// 				pod.change.merge(id, {
// 					target: null,
// 					inventory: {
// 						capacity: components.inventory.capacity,
// 						items: [...components.inventory.items, targetComponents.inventoryItem],
// 					},
// 				})
// 				pod.change.delete(targetId)
// 			}
// 		}
// 	}
// }
//
