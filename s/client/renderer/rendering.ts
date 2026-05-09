
import {disposer} from "@e280/stz"
import {lifecycle} from "@benev/archimedes"
import {degrees, Scalar, Vec2} from "@benev/math"

import {Realm} from "./parts/realm.js"
import {Proximal} from "./utils/proximal.js"
import {TileKind} from "../../lib/gridworld/types.js"
import {Gridchunk} from "../../lib/gridworld/chunk/gridchunk.js"
import {Gridspace} from "../../lib/gridworld/utils/gridspace.js"

export const makeRenderingFns = (realm: Realm) => [
	function updateTiming() {
		realm.timing.update()
	},

	function updateCam() {
		const {cam} = realm.venue
		for (const [_id, components] of realm.entities.select("controlledBy", "position")) {
			if (components.controlledBy === realm.playerId) {
				realm.focal.from(components.position)
				cam.focal = cam.focal.dup().lerp(realm.focal, 0.1)
				cam.swivel = degrees(45)
				cam.zoom = 20
			}
		}
	},

	lifecycle(realm.entities, ["gridchunk", "position"], (_id, components) => {
		const chunk = new Gridchunk(new Gridspace().from(components.position))
		const proximal = new Proximal(realm.focal, 20)
		const wipe = disposer()

		function renderFloorsAndWalls(gridchunk: string) {
			wipe()
			chunk.hex = gridchunk
			for (const {tile, position} of chunk) {
				const center = position.dup().addBy(0.5)

				if (tile !== TileKind.Pit) {
					const [graphic, disposer] = realm.pools.floors.lease()
					wipe.schedule(disposer)
					graphic.setPosition(center)
				}

				if (tile === TileKind.Wall) {
					const [graphic, disposer] = realm.pools.walls.lease()
					wipe.schedule(disposer)
					graphic.setPosition(center, 1)
				}
			}
		}

		return {
			tick(components) {
				const changed = proximal.check(chunk.center)
				if (proximal.nearby && chunk.hex !== components.gridchunk)
					renderFloorsAndWalls(components.gridchunk)
				else if (changed && proximal.nearby)
					renderFloorsAndWalls(components.gridchunk)
				else if (changed && !proximal.nearby)
					wipe()
			},
			exit() {
				wipe()
			},
		}
	}),

	lifecycle(realm.entities, ["position", "graphic", "lerp"], (_id, components) => {
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
			},
			exit() {
				releaseRobot()
			},
		}
	}),
]

