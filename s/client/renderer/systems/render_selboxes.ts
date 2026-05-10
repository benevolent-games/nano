
import {degrees} from "@benev/math"
import {lifecycle} from "@benev/archimedes"

import {Realm} from "../parts/realm.js"
import {consts} from "../../../consts.js"
import {asSystem} from "../../../lib/tools/ecs-plus/as-system.js"
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"

export const render_selboxes = asSystem<Realm>(realm => lifecycle(
	realm.entities,
	["position", "graphic", "rotation", "lerp"],

	(_id, _components) => {
		const [selbox, release] = realm.pools.selboxes.lease()

		return {
			tick(components) {
				const offset = new Gridspace(1, 0)
					.rotate(degrees(270) - components.rotation)
					.normalize()
					.mulBy(consts.interactorReach)

				const target = new Gridspace()
					.from(components.position)
					.add(offset)

				selbox.setPosition(target, 1)
			},

			exit() {
				release()
			},
		}
	},
))

