
import {count2d, hex} from "@e280/stz"
import {Gridspace} from "../utils/gridspace.js"
import {gridChunkSize} from "../utils/grid-chunk-size.js"

export class Gridchunk {
	#tiles = new Uint8Array(gridChunkSize().x * gridChunkSize().y)
	#hex = hex.fromBytes(this.#tiles)

	constructor(public position: Gridspace) {}

	get hex() {
		return this.#hex
	}

	set hex(h: string) {
		this.#tiles.set(hex.toBytes(h), 0)
		this.#hex = hex.fromBytes(this.#tiles)
		if (h !== this.#hex) throw new Error("hex mismatch")
	}

	get center() {
		return this.position.dup().add(gridChunkSize().half())
	}

	*[Symbol.iterator]() {
		let index = 0
		for (const [x, y] of count2d(gridChunkSize().array())) {
			const i = index++
			const tile = this.#tiles.at(i)!
			const position = new Gridspace().from(this.position.dup().add_(x, y))
			yield {tile, position}
		}
	}
}

