
import {count2d} from "@e280/stz"
import {lifecycle} from "@benev/archimedes"
import {InstancedMesh} from "@babylonjs/core/Meshes/instancedMesh.js"

import {Realm} from "./parts/realm.js"
import {resolveGridspace} from "./utils/units.js"
import {Space} from "../../lib/game/parts/space.js"
import {TileKind} from "../../lib/gridworld/types.js"
import {Gridspace} from "../../lib/game/parts/units.js"

export const makeRenderingFns = (space: Space, realm: Realm) => [
	lifecycle(space.entities, ["gridworld", "ready"], (id, components) => {
		const gridworld = space.gridworlds.require(id)
		const instances = new Set<InstancedMesh>()

		let index = 0
		for (const [x, y] of count2d(components.gridworld.extent)) {
			const i = index++
			const tile = gridworld.tiles.at(i)
			const hasFloor = tile !== TileKind.Pit
			if (hasFloor) {
				const floor = realm.instanceFloor(new Gridspace(x, y))
				instances.add(floor)
			}
			if (tile === TileKind.Wall) {
				const wall = realm.instanceWall(new Gridspace(x, y))
				instances.add(wall)
			}
		}

		return {
			tick(_id, _components) {},
			exit(_id) {},
		}
	}),

	lifecycle(space.entities, ["position", "graphic"], (_id, components) => {
		const gridspace = new Gridspace(...components.position)
		const instance = realm.instanceRobot(gridspace)
		return {
			tick(_id, components) {
				gridspace.set_(...components.position)
				instance.position = resolveGridspace(gridspace, 1)
			},
			exit(_id) {
				instance.dispose()
			},
		}
	}),
]

