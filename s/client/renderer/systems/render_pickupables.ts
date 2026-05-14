
import {lifecycle} from "@benev/archimedes"
import {Vec3} from "@benev/math"
import {Realm} from "../parts/realm.js"
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"
import {consts} from "../../../consts.js"

export const render_pickupables = (realm: Realm) => lifecycle(
	realm.entities,
	["position", "pickupable", "rotation"],

	(_id, components) => {
		const gridspace = new Gridspace().from(components.position)

		const pool = (() => {
			switch (components.pickupable) {
				case "cannon": return realm.pools.toolCannon
				case "drill": return realm.pools.toolDrill
				default: return realm.pools.toolCannon
			}
		})()
	
		const [graphic, release] = pool.lease()
		graphic.setScale(Vec3.all(consts.robotScale))

		return {
			tick(components) {
				graphic.setGridspace(gridspace.from(components.position), 0.25)
				graphic.setRotation(components.rotation)
			},

			exit() {
				release()
			},
		}
	},
)


