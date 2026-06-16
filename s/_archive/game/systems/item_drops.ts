
import {Pod} from "../parts/pod.js"
import {selrect} from "../utils/selrect.js"
import {attemptDrop} from "../utils/attempt-drop.js"

export const item_drops = (pod: Pod) => () => {
	for (const [id, components] of pod.entities.select("wishInteractor", "inventory", "position", "rotation", "reach")) {
		const pressedDrop = components.wishInteractor.drop
		const hasItems = components.inventory.length > 0

		const deviation = components.reach / 2

		if (pressedDrop && hasItems) {
			const dropspot = selrect(components).center()
			const inventory = [...components.inventory]
			const itemId = inventory.pop()!

			const dropped = attemptDrop({pod, deviation, dropspot, itemId})

			if (dropped)
				pod.change.merge(id, {inventory})
		}
	}
}

