
import {Vec2} from "@benev/math"
import {disposer} from "@e280/stz"
import {lifecycle} from "@benev/archimedes"

import {Realm} from "./parts/realm.js"
import {Proximal} from "./utils/proximal.js"
import {TileKind} from "../../lib/gridworld/types.js"
import {Gridchunk} from "../../lib/gridworld/chunk/gridchunk.js"
import {Gridspace} from "../../lib/gridworld/utils/gridspace.js"

export const makeRenderingFns = (realm: Realm) => [
	function updateFocal() {
		for (const [_id, components] of realm.entities.select("controllable", "position")) {
			const position = Vec2.from(components.position)
			realm.focal.set(position)
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

	lifecycle(realm.entities, ["position", "graphic"], (_id, components) => {
		const gridspace = new Gridspace(...components.position)
		const [robot, disposeRobot] = realm.pools.robots.lease()
		return {
			tick(components) {
				robot.setPosition(gridspace.set_(...components.position), 1)
			},
			exit() {
				disposeRobot()
			},
		}
	}),
]

