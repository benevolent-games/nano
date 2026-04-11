
import {count2d} from "@e280/stz"
import {lifecycle} from "@benev/archimedes"

import {Realm} from "./parts/realm.js"
import {Space} from "../../lib/game/parts/space.js"
import {TileKind} from "../../lib/gridworld/types.js"
import {Gridspace} from "../../lib/game/parts/units.js"

export const makeRenderingFns = (space: Space, realm: Realm) => [
	lifecycle(space.entities, ["gridworld", "ready"], (id, components) => {
		const gridworld = space.gridworlds.require(id)
		const disposers = new Set<() => void>()

		let index = 0
		for (const [x, y] of count2d(components.gridworld.extent)) {
			const i = index++
			const tile = gridworld.tiles.at(i)
			const hasFloor = tile !== TileKind.Pit
			if (hasFloor) {
				const [graphic, disposer] = realm.pools.floors.borrow()
				disposers.add(disposer)
				graphic.setPosition(new Gridspace(x, y))
			}
			if (tile === TileKind.Wall) {
				const [graphic, disposer] = realm.pools.walls.borrow()
				disposers.add(disposer)
				graphic.setPosition(new Gridspace(x, y), 1)
			}
		}

		console.log(realm.poolReport())

		return {
			tick(_id, _components) {},
			exit(_id) {
				for (const dispose of disposers)
					dispose()
			},
		}
	}),

	lifecycle(space.entities, ["position", "graphic"], (_id, components) => {
		const gridspace = new Gridspace(...components.position)
		const [robot, disposeRobot] = realm.pools.robots.borrow()
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

