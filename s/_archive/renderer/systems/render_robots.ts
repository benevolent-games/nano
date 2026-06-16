
import {got} from "@e280/stz"
import {Vec3} from "@benev/math"
import {lifecycle} from "@benev/archimedes"
import {art} from "../../game/art.js"
import {Realm} from "../realm.js"
import {consts} from "../../../consts.js"
import {Robolocation} from "../utils/robolocation.js"
import {resolveGridspace, resolveRotation, resolveScale} from "../utils/resolve.js"

export const render_robots = (realm: Realm) => lifecycle(
	realm.entities,
	["position", "mech", "mechBuild", "rotation", "lerp"],

	(_id, components) => {
		const robolocation = new Robolocation(components)
		const {mechLower} = got(realm.entities.getWith(components.mechBuild.lowerId, "mechLower"))
		const {mechUpper} = got(realm.entities.getWith(components.mechBuild.upperId, "mechUpper"))

		let lowerArt = mechLower.art
		let upperArt = mechUpper.art

		let [lowerGraphic, releaseLowerGraphic] = realm.graphics.instance(got(art[lowerArt]))
		let [upperGraphic, releaseUpperGraphic] = realm.graphics.instance(got(art[upperArt]))

		lowerGraphic.scale.set(resolveScale(Vec3.all(consts.robotScale)))
		upperGraphic.scale.set(resolveScale(Vec3.all(consts.robotScale)))

		return {
			tick(components) {
				const {mechLower} = got(realm.entities.getWith(components.mechBuild.lowerId, "mechLower"))
				const {mechUpper} = got(realm.entities.getWith(components.mechBuild.upperId, "mechUpper"))

				if (mechLower.art !== lowerArt) {
					lowerArt = mechLower.art
					releaseLowerGraphic()
					const [graphic, release] = realm.graphics.instance(got(art[lowerArt]))
					lowerGraphic = graphic
					lowerGraphic.scale.set(resolveScale(Vec3.all(consts.robotScale)))
					releaseLowerGraphic = release
				}

				if (mechUpper.art !== upperArt) {
					upperArt = mechUpper.art
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

