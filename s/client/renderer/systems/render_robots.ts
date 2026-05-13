
import {lifecycle} from "@benev/archimedes"
import {Circular, Scalar, Vec2} from "@benev/math"
import {Realm} from "../parts/realm.js"
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"

export const render_robots = (realm: Realm) => lifecycle(
	realm.entities,
	["position", "graphic", "rotation", "lerp"],

	(_id, components) => {
		let rotation = components.rotation
		const gridspace = new Gridspace(...components.position)
		const [robot, releaseRobot] = realm.pools.robots.lease()

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
				robot.setPosition(gridspace, 1)
				rotation = Circular.lerp(rotation, components.rotation, components.lerp ?? 1)
				robot.setRotation(rotation)
			},

			exit() {
				releaseRobot()
			},
		}
	},
)

