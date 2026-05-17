
import {Vec3} from "@benev/math"
import {lifecycle} from "@benev/archimedes"
import {Realm} from "../parts/realm.js"
import {consts} from "../../../consts.js"
import {Robolocation} from "../utils/robolocation.js"

export const render_robots = (realm: Realm) => lifecycle(
	realm.entities,
	["position", "mech", "rotation", "lerp"],

	(_id, components) => {
		const robolocation = new Robolocation(components)

		const [lowerGraphic, releaseLowerGraphic] = (() => {switch(components.mech.lower) {
			case "lower-trike": return realm.pools.lowerTrike.lease()
			default: throw new Error("TODO lowers")
		}})()

		const [upperGraphic, releaseUpperGraphic] = (() => {switch(components.mech.upper) {
			case "upper-scout": return realm.pools.upperScout.lease()
			default: throw new Error("TODO lowers")
		}})()

		lowerGraphic.setScale(Vec3.all(consts.robotScale))
		upperGraphic.setScale(Vec3.all(consts.robotScale))

		return {
			tick(components) {
				robolocation.update(realm.timing.delta, components)

				lowerGraphic.setGridspace(robolocation.position, 0)
				upperGraphic.setGridspace(robolocation.position, 0.5)

				lowerGraphic.setRotation(robolocation.rotation.x)
				upperGraphic.setRotation(robolocation.rotation.x)
			},

			exit() {
				releaseLowerGraphic()
				releaseUpperGraphic()
			},
		}
	},
)

