
import {need} from "@e280/stz"
import {degrees} from "@benev/math"
import {Pod} from "../parts/pod.js"
import {selrect} from "../utils/selrect.js"

export const drops = (pod: Pod) => () => {
	for (const [id, components] of pod.entities.select("inventory", "position", "rotation", "reach", "controlledBy")) {
		const a = need(pod.actors, components.controlledBy).actions.robot
		const hasItems = components.inventory.items.length > 0

		if (a.drop.changedDown && hasItems) {
			const items = [...components.inventory.items]
			const topItem = items.pop()!

			// place onto ground
			pod.change.create({
				size: [0.8, 0.8],
				position: selrect(components).center().array(),
				pickupable: topItem,
				rotation: pod.rand.integerRange(0, 3) * degrees(90),
				targetable: true,
			})

			// remove from inventory
			pod.change.merge(id, {inventory: {...components.inventory, items}})
		}
	}
}

