
import {Vec3} from "@benev/math"
import {lifecycle} from "@benev/archimedes"
import {art} from "../art.js"
import {Realm} from "../realm.js"
import {consts} from "../../../consts.js"
import {Proximal} from "../utils/proximal.js"
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"
import {resolvePosition, resolveRotation, resolveScale} from "../utils/resolve.js"

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
					const chosenArt = (() => {
						switch (components.pickupable) {
							case "a-cannon": return art.aCannon
							case "a-drill": return art.aDrill
							case "b-dome": return art.bDome
							case "ore-carbon": return art.oreCarbon
							case "ore-coltan": return art.oreColtan
							case "ore-gold": return art.oreGold
							case "ingot-gold": return art.ingotGold
							case "ingot-tantalum": return art.ingotTantalum
							case "lower-quadcar": return art.lowerQuadcar
							case "lower-treads": return art.lowerTreads
							case "lower-trike": return art.lowerTrike
							case "upper-scout": return art.upperScout
							case "upper-pragmatist": return art.upperPragmatist
							case "upper-utilitarian": return art.upperUtilitarian
							case "upper-chonky": return art.upperChonky
							default: throw new Error(`unknown pickupable "${components.pickupable}"`)
						}
					})()
					const [graphic, release] = realm.graphics.instance(chosenArt)
					graphic.scale.set(resolveScale(Vec3.all(consts.robotScale)))
					graphic.position.set(resolvePosition(gridspace))
					graphic.rotation.set(resolveRotation(components.rotation))
					return release
				})
			},

			exit() {
				proximal.dispose()
			},
		}
	},
)

