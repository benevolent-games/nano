
import {lifecycle} from "@benev/archimedes"
import {Circular, Scalar, Vec2, Vec3} from "@benev/math"
import {Realm} from "../parts/realm.js"
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"
import { consts } from "../../../consts.js"

export const render_robots = (realm: Realm) => lifecycle(
	realm.entities,
	["position", "graphic", "rotation", "lerp", "radius"],

	(_id, components) => {
		let rotation = components.rotation
		const gridspace = new Gridspace(...components.position)
		const [chassis, releaseChassis] = realm.pools.chassis.lease()
		chassis.setScale(Vec3.all(consts.robotScale))

		return {
			tick(components) {
				const factor = Scalar.clamp(
					1 - Math.pow(1 - components.lerp, realm.timing.delta / 16.6667),
					0,
					1,
				)
				gridspace.add(
					Vec2.from(components.position)
						.sub(gridspace)
						.mulBy(factor)
				)
				chassis.setGridspace(gridspace, 0)
				rotation = Circular.lerp(rotation, components.rotation, components.lerp ?? 1)
				chassis.setRotation(rotation)
			},

			exit() {
				releaseChassis()
			},
		}
	},
)

