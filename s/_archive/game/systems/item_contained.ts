
import {deep} from "@e280/stz"
import {Vec2} from "@benev/math"
import {Pod} from "../parts/pod.js"
import {attemptDrop} from "../utils/attempt-drop.js"

export const item_contained = (pod: Pod) => () => {
	for (const [id, components] of pod.entities.select("containerId", "position")) {
		let position = components.position
		const containerComponents = pod.entities.getWith(components.containerId, "position")

		// items track position of container
		if (containerComponents) {
			if (!deep.equal(position, containerComponents.position))
				position = structuredClone(containerComponents.position)
				pod.change.merge(id, {position})
		}

		// if container is gone, then we drop
		else {
			attemptDrop({
				pod,
				itemId: id,
				deviation: 0.25,
				dropspot: Vec2.from(position),
			})
		}
	}
}

