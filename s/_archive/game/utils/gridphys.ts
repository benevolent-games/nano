
import {Id} from "@benev/archimedes"
import {Lattice, Rect} from "@benev/math"

import {Phys, PhysBox} from "./phys.js"
import {TileKind} from "../../../lib/gridworld/types.js"
import {Gridchunk} from "../../../lib/gridworld/chunk/gridchunk.js"
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"

export class Gridphys {
	#id
	#chunk
	#lattice
	#phys = new Set<Phys>()

	constructor(lattice: Lattice<Phys>, id: Id, position: Gridspace) {
		this.#id = id
		this.#lattice = lattice
		this.#chunk = new Gridchunk(position)
	}

	dump() {
		for (const p of this.#phys) this.#lattice.remove(p)
		this.#phys.clear()
	}

	populate() {
		for (const {tile, position} of this.#chunk.tiles()) {
			if (tile !== TileKind.Floor) {
				const obstacle = new PhysBox(
					this.#id,
					new Rect(position, position.dup().add_(1, 1)),
					undefined,
				)
				this.#lattice.upsert(obstacle, obstacle.rect)
				this.#phys.add(obstacle)
			}
		}
	}

	update(hex: string) {
		const changed = this.#chunk.hex !== hex
		if (changed) {
			this.#chunk.hex = hex
			this.dump()
			this.populate()
		}
	}
}

