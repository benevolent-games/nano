
import {Vec2} from "@benev/math"
import {count2d, hex} from "@e280/stz"
import {lifecycle} from "@benev/archimedes"

import {Realm} from "./parts/realm.js"
import {consts} from "../../lib/game/consts.js"
import {Space} from "../../lib/game/parts/space.js"
import {TileKind} from "../../lib/gridworld/types.js"
import {Gridspace} from "../../lib/game/parts/units.js"

export const makeRenderingFns = (space: Space, realm: Realm) => [
	function updateFocal() {
		for (const [_id, components] of space.entities.select("controllable", "position")) {
			const position = Vec2.from(components.position)
			realm.focal.set(position)
		}
	},

	lifecycle(space.entities, ["gridchunk", "position"], () => {
		const chunkSize = consts.gridChunkSize()
		const interestThreshold = 20 ** 2
		let wasInteresting = false

		const disposers = new Set<() => void>()
		const wipeGraphics = () => {
			disposers.forEach(d => d())
			disposers.clear()
		}

		const isInteresting = (gridspace: Gridspace) => {
			return gridspace.distanceSquared(realm.focal) < interestThreshold
		}

		function renderFloorsAndWalls(corner: Gridspace, gridchunk: string) {
			const data = hex.toBytes(gridchunk)

			let index = 0
			for (const [x, y] of count2d(chunkSize.array())) {
				const i = index++
				const position = corner.dup().add_(x, y)
				const tile = data.at(i)
				const hasFloor = tile !== TileKind.Pit
				if (hasFloor) {
					const [graphic, disposer] = realm.pools.floors.lease()
					disposers.add(disposer)
					graphic.setPosition(position)
				}
				if (tile === TileKind.Wall) {
					const [graphic, disposer] = realm.pools.walls.lease()
					disposers.add(disposer)
					graphic.setPosition(position)
				}
			}
		}

		return {
			tick(_id, components) {
				const position = new Gridspace(...components.position)
				const center = position.dup().add(consts.gridChunkSize().half())
				const nowInteresting = isInteresting(center)
				const interestingChange = nowInteresting !== wasInteresting
				wasInteresting = nowInteresting

				if (interestingChange && nowInteresting) {
					wipeGraphics()
					renderFloorsAndWalls(position, components.gridchunk)
				}

				if (interestingChange && !nowInteresting) {
					wipeGraphics()
				}
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

