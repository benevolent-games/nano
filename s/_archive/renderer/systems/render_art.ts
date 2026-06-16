
import {Vec2, Vec3} from "@benev/math"
import {lifecycle} from "@benev/archimedes"
import {Realm} from "../realm.js"
import {needArt} from "../utils/need-art.js"
import {resolveGridspace, resolveRotation, resolveScale} from "../utils/resolve.js"

export const render_art = (realm: Realm) => lifecycle(
	realm.entities,
	["art", "position", "rotation", "scale"],

	(_id, components) => {
		const [graphic, release] = realm.graphics.instance(needArt(components.art))

		const tick = (c: typeof components) => {
			graphic.visible = !c.containerId
			graphic.scale.set(resolveScale(Vec3.all(c.scale)))
			graphic.position.set(resolveGridspace(Vec2.from(c.position)))
			graphic.rotation.set(resolveRotation(c.rotation))
		}

		tick(components)

		return {
			tick,
			exit() {
				release()
			},
		}
	},
)

