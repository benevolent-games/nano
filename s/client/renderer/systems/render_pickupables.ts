
import {Vec3} from "@benev/math"
import {lifecycle} from "@benev/archimedes"
import {Realm} from "../parts/realm.js"
import {consts} from "../../../consts.js"
import {Proximal} from "../utils/proximal.js"
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"

export const render_pickupables = (realm: Realm) => lifecycle(
	realm.entities,
	["position", "pickupable", "rotation"],

	(_id, components) => {
		const gridspace = new Gridspace().from(components.position)
		const proximal = new Proximal()

		return {
			tick(components) {
				gridspace.from(components.position)
				proximal.on(consts.renderProximity, realm.focal, gridspace, () => {
					const pool = (() => {
						switch (components.pickupable) {
							case "cannon": return realm.pools.toolCannon
							case "drill": return realm.pools.toolDrill
							case "carbon": return realm.pools.carbon
							case "battery": return realm.pools.battery
							default: return realm.pools.toolCannon
						}
					})()
					const [graphic, release] = pool.lease()
					graphic.setScale(Vec3.all(consts.robotScale))
					graphic.setGridspace(gridspace, 0.25)
					graphic.setRotation(components.rotation)
					return release
				})
			},

			exit() {
				proximal.dispose()
			},
		}
	},
)

