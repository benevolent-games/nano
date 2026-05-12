
import {Id} from "@benev/archimedes"
import {Rect, Scalar, XyArray} from "@benev/math"
import {count2d, guarantee, hex, need} from "@e280/stz"

import {index2d} from "../../tools/index2d.js"
import {Gridworld, TileKind} from "../../gridworld/types.js"
import {initGridworld} from "../../gridworld/utils/grid.js"
import {Gridspace} from "../../gridworld/utils/gridspace.js"
import {gridChunkSize} from "../../gridworld/utils/grid-chunk-size.js"

const size = gridChunkSize()

type ChunkKey = string
type Hex = string
type Chunk = {
	id: Id
	key: ChunkKey
	position: Gridspace
	gridchunk: Hex
}

function chunkKey(position: Gridspace) {
	const {x, y} = position.dup()
		.div(size)
		.floor()
		.mul(size)
	return `${x},${y}`
}

function fractionFromU8(u8: number) {
	return u8 / 255
}

function fractionToU8(fraction: number) {
	return Math.floor(Scalar.clamp(fraction) * 255)
}

export class Hologrid {
	#gridworld
	#chunkById = new Map<Id, Chunk>()
	#chunkByKey = new Map<ChunkKey, Chunk>()
	#changedChunkIds = new Set<Id>()

	constructor(extent: Gridspace) {
		this.#gridworld = initGridworld(extent)
	}

	updateChunk(id: Id, components: {position: XyArray, gridchunk: string}) {
		const position = new Gridspace().from(components.position)
		const chunk = guarantee(this.#chunkById, id, () => {
			const c = {
				id,
				position,
				key: chunkKey(position),
				gridchunk: "",
			}
			this.#chunkByKey.set(c.key, c)
			return c
		})
		if (components.gridchunk !== chunk.gridchunk) {
			chunk.gridchunk = components.gridchunk
			for (const {cellWorldPosition, tile, integrity} of deserializeChunk(chunk)) {
				const index = index2d(this.#gridworld.extent, cellWorldPosition)
				this.#gridworld.tiles[index] = tile
				this.#gridworld.integrity[index] = integrity
			}
		}
	}

	cell(position: Gridspace) {
		const {id} = need(this.#chunkByKey, chunkKey(position))
		const changed = () => this.#changedChunkIds.add(id)
		return new Holocell(this.#gridworld, position, changed)
	}

	region(rect: Rect) {
		const cells: Holocell[] = []
		for (const [x, y] of count2d(rect.size().array())) {
			const position = new Gridspace().set(rect.min).add_(x, y)
			cells.push(this.cell(position))
		}
		return cells
	}

	flushChanges() {
		const chunks: Chunk[] = []
		for (const id of this.#changedChunkIds) {
			const chunk = need(this.#chunkById, id)
			chunk.gridchunk = serializeChunk(this.#gridworld, chunk.position)
			chunks.push(chunk)
		}
		this.#changedChunkIds.clear()
		return chunks
	}
}

export class Holocell {
	readonly index: number

	constructor(
			private gridworld: Gridworld,
			public readonly position: Gridspace,
			private changed: () => void,
		) {
		this.index = index2d(gridworld.extent, position)
	}

	get kind() {
		return this.gridworld.tiles[this.index] as TileKind
	}

	set kind(kind: TileKind) {
		if (this.kind !== kind) {
			this.gridworld.tiles[this.index] = kind
			this.changed()
		}
	}

	get integrity() {
		return fractionFromU8(this.gridworld.integrity[this.index])
	}

	set integrity(fraction: number) {
		const byte = fractionToU8(fraction)
		if (this.gridworld.integrity[this.index] !== byte) {
			this.gridworld.integrity[this.index] = byte
			this.changed()
		}
	}
}

export function serializeChunk(gridworld: Gridworld, chunkPosition: Gridspace) {
	const bytesPerCell = 2
	const cellCount = size.x * size.y
	const bytes = new Uint8Array(cellCount * bytesPerCell)
	for (const [x, y] of count2d(size.array())) {
		const worldIndex = index2d(gridworld.extent, new Gridspace().set(chunkPosition).add_(x, y))
		const i = index2d(size, {x, y}) * bytesPerCell
		bytes[i + 0] = gridworld.tiles[worldIndex]
		bytes[i + 1] = gridworld.integrity[worldIndex]
	}
	return hex.fromBytes(bytes)
}

export function deserializeChunk(chunk: Chunk) {
	const bytesPerCell = 2
	const bytes = hex.toBytes(chunk.gridchunk)
	const results: {cellWorldPosition: Gridspace, tile: TileKind, integrity: number}[] = []

	for (const [x, y] of count2d(size.array())) {
		const cellWorldPosition = new Gridspace().set(chunk.position).add_(x, y)
		const i = index2d(size, {x, y}) * bytesPerCell
		results.push({
			cellWorldPosition,
			tile: bytes[i + 0],
			integrity: bytes[i + 1],
		})
	}

	return results
}

