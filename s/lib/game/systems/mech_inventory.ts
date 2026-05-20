
import {Pod} from "../parts/pod.js"

export const mech_inventory = (pod: Pod) => () => {
	for (const [id, components] of pod.entities.select("mech", "inventory")) {
		const {upper} = components.mech

		if (upper.capacity !== components.inventory.capacity)
			pod.change.merge(id, {inventory: {
				...components.inventory,
				capacity: upper.capacity,
			}})
	}
}

