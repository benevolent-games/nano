
import {Vec2} from "@benev/math"
import {Actions} from "@benev/tact/core"
import {count2d, cycle, hex, nap} from "@e280/stz"
import {applyDelta, Change, Entities, makeExecute} from "@benev/archimedes"

import {consts} from "./consts.js"
import {systems} from "./systems.js"
import {Space} from "./parts/space.js"
import {index} from "../gridworld/utils/grid.js"
import {GameBindings} from "./parts/bindings.js"
import {GameComponents} from "./parts/components.js"
import {generateGridworld} from "../gridworld/generate.js"

export class Game {
	entities = new Entities<GameComponents>()
	change = new Change<GameComponents>(delta => applyDelta(this.entities, delta))
	space
	simulate

	constructor(actions: Actions<GameBindings>, poll: () => void) {
		this.space = new Space(this.entities.readonly, actions)
		const simtick = makeExecute(this.entities, systems(this.space))
		this.simulate = () => {
			poll()
			simtick()
		}
	}

	initialize() {
		const gridworld = generateGridworld(1, new Vec2(64, 64))
		const size = consts.gridChunkSize()
		const chunks = gridworld.extent.dup().div(size)
		for (const [chunkX, chunkY] of count2d(chunks.array())) {
			const data = new Uint8Array(size.x * size.y)
			for (const [tileX, tileY] of count2d(size.array())) {
				const worldX = (chunkX * size.x) + tileX
				const worldY = (chunkY * size.y) + tileY
				const worldIndex = index(gridworld.extent, new Vec2(worldX, worldY))
				const localIndex = index(size, new Vec2(tileX, tileY))
				const tile = gridworld.tiles.at(worldIndex)!
				data[localIndex] = tile
			}
			this.change.create({
				position: consts.gridChunkSize().mul_(chunkX, chunkY).array(),
				gridchunk: hex.fromBytes(data),
			})
		}
		this.change.create({graphic: "robot", controllable: true, position: [0, 0]})
	}

	simulationLoop() {
		return cycle(async() => {
			this.simulate()
			await nap(1000 / 60)
		})
	}
}

