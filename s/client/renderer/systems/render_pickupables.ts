
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
							case "e-cannon": return realm.pools.aCannon
							case "e-drill": return realm.pools.aDrill
							case "e-dome": return realm.pools.bDome
							case "ore-carbon": return realm.pools.oreCarbon
							case "ore-coltan": return realm.pools.oreColtan
							case "ore-gold": return realm.pools.oreGold
							case "ingot-gold": return realm.pools.ingotGold
							case "ingot-tantalum": return realm.pools.ingotTantalum
							case "lower-quadcar": return realm.pools.lowerQuadcar
							case "lower-treads": return realm.pools.lowerTreads
							case "lower-trike": return realm.pools.lowerTrike
							case "upper-scout": return realm.pools.upperScout
							case "upper-pragmatist": return realm.pools.upperPragmatist
							case "upper-utilitarian": return realm.pools.upperUtilitarian
							case "upper-chonky": return realm.pools.upperChonky
							default: throw new Error(`unknown pickupable "${components.pickupable}"`)
						}
					})()
					const [graphic, release] = pool.lease()
					graphic.setScale(Vec3.all(consts.robotScale))
					graphic.setGridspace(gridspace)
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

