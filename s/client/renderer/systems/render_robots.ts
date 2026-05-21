
import {got} from "@e280/stz"
import {Vec3} from "@benev/math"
import {lifecycle} from "@benev/archimedes"
import {art} from "../../../lib/game/art.js"
import {Realm} from "../realm.js"
import {consts} from "../../../consts.js"
import {Robolocation} from "../utils/robolocation.js"
import {resolveGridspace, resolveRotation, resolveScale} from "../utils/resolve.js"

export const render_robots = (realm: Realm) => lifecycle(
	realm.entities,
	["position", "mech", "lowerRotation", "rotation", "lerp"],

	(_id, components) => {
		const robolocation = new Robolocation(components)
		let lowerArt = components.mech.lower.name
		let upperArt = components.mech.upper.name

		let [lowerGraphic, releaseLowerGraphic] = realm.graphics.instance(got(art[lowerArt]))
		let [upperGraphic, releaseUpperGraphic] = realm.graphics.instance(got(art[upperArt]))

		lowerGraphic.scale.set(resolveScale(Vec3.all(consts.robotScale)))
		upperGraphic.scale.set(resolveScale(Vec3.all(consts.robotScale)))

		return {
			tick(components) {
				if (components.mech.lower.name !== lowerArt) {
					lowerArt = components.mech.lower.name
					releaseLowerGraphic()
					const [graphic, release] = realm.graphics.instance(got(art[lowerArt]))
					lowerGraphic = graphic
					lowerGraphic.scale.set(resolveScale(Vec3.all(consts.robotScale)))
					releaseLowerGraphic = release
				}

				if (components.mech.upper.name !== upperArt) {
					upperArt = components.mech.upper.name
					releaseUpperGraphic()
					const [graphic, release] = realm.graphics.instance(got(art[upperArt]))
					upperGraphic = graphic
					upperGraphic.scale.set(resolveScale(Vec3.all(consts.robotScale)))
					releaseUpperGraphic = release
				}

				robolocation.update(realm.timing.delta, components)

				lowerGraphic.position.set(resolveGridspace(robolocation.position, 0))
				upperGraphic.position.set(resolveGridspace(robolocation.position, 0.5))

				lowerGraphic.rotation.set(resolveRotation(robolocation.lowerRotation.x))
				upperGraphic.rotation.set(resolveRotation(robolocation.upperRotation.x))
			},

			exit() {
				releaseLowerGraphic()
				releaseUpperGraphic()
			},
		}
	},
)

