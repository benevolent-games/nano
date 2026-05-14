
import {Vec3} from "@benev/math"
import {lifecycle} from "@benev/archimedes"
import {Realm} from "../parts/realm.js"
import {consts} from "../../../consts.js"
import {Robolocation} from "../utils/robolocation.js"

export const render_inventory_full = (realm: Realm) => lifecycle(
	realm.entities,
	["inventory", "graphic", "position", "rotation", "lerp"],

	(_id, components) => {
		const robolocation = new Robolocation(components)
		const [graphic, release] = realm.pools.inventoryFull.lease()
		graphic.setScale(Vec3.all(consts.robotScale))

		return {
			tick(components) {
				robolocation.update(realm.timing.delta, components)
				graphic.setGridspace(robolocation.position)
				graphic.setRotation(robolocation.rotation.x)

				const isFull = components.inventory.items.length >= components.inventory.capacity
				graphic.setVisibility(isFull)
			},

			exit() {
				release()
			},
		}
	},
)

