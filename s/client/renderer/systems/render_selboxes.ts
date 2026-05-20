
import {lifecycle} from "@benev/archimedes"
import {art} from "../art.js"
import {Realm} from "../realm.js"
import {selrect} from "../../../lib/game/utils/selrect.js"
import {resolveGridspace, resolveScale} from "../utils/resolve.js"

export const render_selboxes = (realm: Realm) => lifecycle(
	realm.entities,
	["debug", "position", "rotation", "reach"],

	(_id, components) => {
		const [selbox, release] = realm.graphics.instance(art.phasebox)

		const rect = selrect(components)
		const size = rect.size()
		selbox.scale = resolveScale({x: size.x, y: size.y, z: 1})

		return {
			tick(components) {
				const rect = selrect(components)
				selbox.position = resolveGridspace(rect.center(), 0.5)
			},

			exit() {
				release()
			},
		}
	},
)

