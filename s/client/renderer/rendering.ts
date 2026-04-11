
import {count2d} from "@e280/stz"
import {lifecycle} from "@benev/archimedes"

import {Realm} from "./parts/realm.js"
import {Space} from "../../lib/game/parts/space.js"
import {TileKind} from "../../lib/gridworld/types.js"
import {Gridspace} from "../../lib/game/parts/units.js"

export const makeRenderingFns = (space: Space, realm: Realm) => [

	// rendering the gridworld (floors, walls, etc)
	lifecycle(space.entities, ["gridworld", "ready"], (id, components) => {
		const gridworld = space.gridworlds.require(id)
		const disposers = new Set<() => void>()
		const interestThreshold = 20 ** 2

		const isInteresting = (gridspace: Gridspace) => {
			return gridspace.distanceSquared(realm.focal) < interestThreshold
		}

		let index = 0
		for (const [x, y] of count2d(components.gridworld.extent)) {
			const i = index++
			const gridspace = new Gridspace(x, y)
			if (!isInteresting(gridspace)) continue
			const tile = gridworld.tiles.at(i)
			const hasFloor = tile !== TileKind.Pit
			if (hasFloor) {
				const [graphic, disposer] = realm.pools.floors.lease()
				disposers.add(disposer)
				graphic.setPosition(gridspace)
			}
			if (tile === TileKind.Wall) {
				const [graphic, disposer] = realm.pools.walls.lease()
				disposers.add(disposer)
				graphic.setPosition(gridspace)
			}
		}

		return {
			tick(_id, _components) {
				// TODO update which floors and such we're rendering
			},
			exit(_id) {
				for (const dispose of disposers)
					dispose()
			},
		}
	}),

	lifecycle(space.entities, ["position", "graphic"], (_id, components) => {
		const gridspace = new Gridspace(...components.position)
		const [robot, disposeRobot] = realm.pools.robots.lease()
		return {
			tick(_id, components) {
				robot.setPosition(gridspace.set_(...components.position), 1)
			},
			exit(_id) {
				disposeRobot()
			},
		}
	}),
]

