
import {got} from "@e280/stz"
import {compose, Mat4} from "@benev/math"
import {createHierarchyInstancePool, HierarchyInstancePool, setHierarchyInstanceCount, setHierarchyInstanceMatrix} from "@babylonjs/lite"

import {Art} from "./art.js"
import {Prop} from "../types.js"
import {Artwork} from "./artwork.js"
import {Graphics} from "./graphics.js"

export class Replicator<Context> {
	#state = new Map<Art<Context>, {prop: Prop, pool: HierarchyInstancePool}>()
	#matrix = new Mat4().tuple()

	constructor(
			public readonly context: Context,
			public readonly artwork: Artwork<Context, unknown>,
			public readonly graphics: Graphics,
		) {

		for (const art of artwork) {
			const prop = art.resolve(context)
			const pool = createHierarchyInstancePool(prop, art.capacity)
			this.#state.set(art, {prop, pool})
		}
	}

	update() {
		for (const [art, instances] of this.graphics.entries()) {
			const {pool} = got(this.#state.get(art))

			let count = 0
			for (const instance of instances) {
				if (!instance.visible) continue

				if (count >= art.capacity) {
					console.warn("exceeded art capacity")
					break
				}

				compose(this.#matrix, instance.position, instance.rotation, instance.scale)
				setHierarchyInstanceMatrix(pool, count, this.#matrix)
				count++
			}

			if (pool.count !== count)
				setHierarchyInstanceCount(pool, count)
		}
	}

	dispose() {
		// TODO ??
	}
}

