
import {need} from "@e280/stz"
import {Pod} from "../parts/pod.js"
import { equipmentize } from "../utils/itemize.js"
import { Vec2 } from "@benev/math"

export const equips = (pod: Pod) => () => {
	for (const [id, components] of pod.entities.select("controlledBy", "target")) {
		const targetId = components.target
		const a = need(pod.actors, components.controlledBy).actions.mech

		if (targetId && a.use.changedDown) {
			console.log("EQUIP", targetId)
			const target = pod.entities.getWith(targetId, "equippable", "position")

			if (target) {
				const position = Vec2.from(target.position)

				if (target.equippable.mechLower && components.mech) {
					const oldLower = components.mech.lower
					pod.change.merge(id, {
						mech: {...components.mech, lower: target.equippable.mechLower}
					})
					pod.change.delete(targetId)
					pod.change.create(equipmentize(pod.rand, oldLower.name, {mechLower: oldLower})(position))
				}

				if (target.equippable.mechUpper && components.mech) {
					const oldUpper = components.mech.upper
					pod.change.merge(id, {
						mech: {...components.mech, upper: target.equippable.mechUpper}
					})
					pod.change.delete(targetId)
					pod.change.create(equipmentize(pod.rand, oldUpper.name, {mechUpper: oldUpper})(position))
				}
				
				// pod.change.merge(id, {
				// 	target: null,
				// 	inventory: {
				// 		capacity: components.inventory.capacity,
				// 		items: [...components.inventory.items, targetComponents.pickupable],
				// 	},
				// })
				// pod.change.delete(targetId)
			}
		}
	}
}

