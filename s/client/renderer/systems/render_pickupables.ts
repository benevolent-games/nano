
import {got} from "@e280/stz"
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
					const chosenArt = got(art[components.pickupable])
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

