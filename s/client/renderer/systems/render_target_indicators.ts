
import {lifecycle} from "@benev/archimedes"
import {art} from "../../../lib/game/art.js"
import {Realm} from "../realm.js"
import {resolveGridspace} from "../utils/resolve.js"
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"

export const render_target_indicators = (realm: Realm) => lifecycle(
	realm.entities,
	["target"],

	(_id, _components) => {
		const [graphic, release] = realm.graphics.instance(art.indicator)

		return {
			tick(components) {
				const target = components.target
					? realm.entities.get(components.target)
					: undefined

				if ((target && target.position)) {
					graphic.visible = true
					const position = new Gridspace().from(target.position)
					graphic.position.set(resolveGridspace(position))
				}
				else {
					graphic.visible = false
				}
			},

			exit() {
				release()
			},
		}
	},
)

