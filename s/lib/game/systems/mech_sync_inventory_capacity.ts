
import {got} from "@e280/stz"
import {Pod} from "../parts/pod.js"

export const mech_sync_inventory_capacity = (pod: Pod) => () => {
	for (const [id, components] of pod.entities.select("mechBuild", "inventoryCapacity")) {
		const {mechUpper} = got(pod.entities.getWith(components.mechBuild.upper, "mechUpper"))

		if (mechUpper.inventoryCapacity !== components.inventoryCapacity)
			pod.change.merge(id, {inventoryCapacity: mechUpper.inventoryCapacity})
	}
}

