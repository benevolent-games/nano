
import {Vec3} from "@benev/math"
import {lifecycle} from "@benev/archimedes"

import {Realm} from "../parts/realm.js"
import {selrect} from "../../../lib/game/utils/selrect.js"

export const render_selboxes = (realm: Realm) => lifecycle(
	realm.entities,
	["position", "graphic", "rotation", "reach", "lerp", "debug"],

	(_id, _components) => {
		const [selbox, release] = realm.pools.selboxes.lease()

		return {
			tick(components) {
				const rect = selrect(components)
				const size = rect.size()
				selbox.setGridspace(rect.center())
				selbox.setScale(new Vec3(size.x, size.y, 0.5))
			},

			exit() {
				release()
			},
		}
	},
)

