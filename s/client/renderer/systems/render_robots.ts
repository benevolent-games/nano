
import {Vec3} from "@benev/math"
import {lifecycle} from "@benev/archimedes"
import {art} from "../art.js"
import {Realm} from "../realm.js"
import {consts} from "../../../consts.js"
import {Robolocation} from "../utils/robolocation.js"
import {resolveGridspace, resolveRotation, resolveScale} from "../utils/resolve.js"

export const render_robots = (realm: Realm) => lifecycle(
	realm.entities,
	["position", "mech", "rotation", "lerp"],

	(_id, components) => {
		const robolocation = new Robolocation(components)

		const [lowerGraphic, releaseLowerGraphic] = (() => {switch(components.mech.lower) {
			case "lower-trike": return realm.graphics.instance(art.lowerTrike)
			default: throw new Error("TODO lowers")
		}})()

		const [upperGraphic, releaseUpperGraphic] = (() => {switch(components.mech.upper) {
			case "upper-scout": return realm.graphics.instance(art.upperScout)
			default: throw new Error("TODO lowers")
		}})()

		lowerGraphic.scale.set(resolveScale(Vec3.all(consts.robotScale)))
		upperGraphic.scale.set(resolveScale(Vec3.all(consts.robotScale)))

		return {
			tick(components) {
				robolocation.update(realm.timing.delta, components)

				lowerGraphic.position.set(resolveGridspace(robolocation.position, 0))
				upperGraphic.position.set(resolveGridspace(robolocation.position, 0.5))

				lowerGraphic.rotation.set(resolveRotation(robolocation.rotation.x))
				upperGraphic.rotation.set(resolveRotation(robolocation.rotation.x))
			},

			exit() {
				releaseLowerGraphic()
				releaseUpperGraphic()
			},
		}
	},
)

