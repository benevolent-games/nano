
import {got} from "@e280/stz"
import {compose, Mat4} from "@benev/math"
import {createHierarchyInstancePool, HierarchyInstancePool, setHierarchyInstanceCount, setHierarchyInstanceMatrix} from "@babylonjs/lite"

import {Prop} from "./types.js"
import {Art} from "./art/art.js"
import {AssetDepot} from "./depot.js"
import {Artwork} from "./art/types.js"
import {Figures} from "./art/figures.js"

export class Replicator {
	#state = new Map<Art, {prop: Prop, pool: HierarchyInstancePool}>()
	#matrix = new Mat4().tuple()

	constructor(
			public readonly artwork: Artwork,
			public readonly depot: AssetDepot,
			public readonly figures: Figures,
		) {

		for (const art of Art.collect(artwork)) {
			const prop = depot.prop(art.name)
			const pool = createHierarchyInstancePool(prop, art.population)
			this.#state.set(art, {prop, pool})
		}
	}

	update() {
		for (const [art, figset] of this.figures.entries()) {
			const {pool} = got(this.#state.get(art))

			let count = 0
			for (const figure of figset) {
				if (!figure.visible) continue

				if (count >= art.population) {
					console.warn("exceeded art capacity")
					break
				}

				compose(this.#matrix, figure.position, figure.rotation, figure.scale)
				setHierarchyInstanceMatrix(pool, count, this.#matrix)
				count++
			}

			if (pool.count !== count)
				setHierarchyInstanceCount(pool, count)
		}
	}
}

