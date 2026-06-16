
import {Vec2} from "@benev/math"
import {Pod} from "../parts/pod.js"
import {attemptDrop} from "../utils/attempt-drop.js"

export const item_equip_mech_chassis = (pod: Pod) => () => {
	for (const [id, components] of pod.entities.select("wishInteractor", "target", "mechBuild")) {
		const itemId = components.target
		const pressedButton = components.wishInteractor.use
		if (!pressedButton) continue
		if (!itemId) continue

		const item = pod.entities.getWith(itemId, "position")
		if (!item) continue

		if (item.mechLower) {
			const oldId = components.mechBuild.lowerId
			const dropped = attemptDrop({
				pod,
				itemId: oldId,
				deviation: 0.1,
				dropspot: Vec2.from(item.position),
			})
			if (dropped) {
				pod.change.drop(oldId, "equipped")
				pod.change.merge(itemId, {equipped: true, containerId: id})
				pod.change.drop(itemId, "targetable")
				pod.change.merge(id, {mechBuild: {...components.mechBuild, lowerId: itemId}})
			}
		}

		if (item.mechUpper) {
			const oldId = components.mechBuild.upperId
			const dropped = attemptDrop({
				pod,
				itemId: oldId,
				deviation: 0.1,
				dropspot: Vec2.from(item.position),
			})
			if (dropped) {
				pod.change.drop(oldId, "equipped")
				pod.change.merge(itemId, {equipped: true, containerId: id})
				pod.change.drop(itemId, "targetable")
				pod.change.merge(id, {mechBuild: {...components.mechBuild, upperId: itemId}})
			}
		}
	}
}

