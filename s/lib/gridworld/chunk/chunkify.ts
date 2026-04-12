
import {Vec2} from "@benev/math"
import {count2d, hex} from "@e280/stz"

import {Gridworld} from "../types.js"
import {index2d} from "../../tools/index2d.js"
import {gridChunkSize} from "../utils/grid-chunk-size.js"

export function* chunkify(gridworld: Gridworld) {
	const size = gridChunkSize()
	const chunks = gridworld.extent.dup().div(size)

	for (const [chunkX, chunkY] of count2d(chunks.array())) {
		const data = new Uint8Array(size.x * size.y)

		for (const [tileX, tileY] of count2d(size.array())) {
			const worldX = (chunkX * size.x) + tileX
			const worldY = (chunkY * size.y) + tileY
			const worldIndex = index2d(gridworld.extent, new Vec2(worldX, worldY))
			const localIndex = index2d(size, new Vec2(tileX, tileY))
			const tile = gridworld.tiles.at(worldIndex)!
			data[localIndex] = tile
		}

		yield {
			position: gridChunkSize().mul_(chunkX, chunkY).array(),
			gridchunk: hex.fromBytes(data),
		}
	}
}

