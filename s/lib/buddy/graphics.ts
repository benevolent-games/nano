
import {got, guarantee} from "@e280/stz"
import {clamp, Mat4, matrix4Compose, matrix4ComposeInPlace, Quat, Vec3} from "@benev/math"
import {createHierarchyInstancePool, HierarchyInstancePool, setHierarchyInstanceCount, setHierarchyInstanceMatrix} from "@babylonjs/lite"

import {Art} from "./art.js"
import {Prop} from "./types.js"
import {Artwork} from "./artwork.js"

export class Graphics {
	#map = new Map<Art<unknown>, Set<Instance>>()

	instance(art: Art<unknown>) {
		const set = guarantee(this.#map, art, () => new Set())
		const instance = new Instance(() => set.delete(instance))
		set.add(instance)
		return instance
	}

	entries() {
		return this.#map.entries()
	}
}

export class Instance {
	visible = true
	scale = new Vec3(1, 1, 1)
	position = new Vec3()
	rotation = new Quat()
	constructor(public readonly dispose: () => void) {}
}

export class GraphicsReplicator<Context> {
	#state = new Map<Art<Context>, {prop: Prop, pool: HierarchyInstancePool}>()
	#matrix = Mat4.identityArray()

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

				matrix4ComposeInPlace(this.#matrix, instance.position, instance.rotation, instance.scale)
				setHierarchyInstanceMatrix(pool, count, this.#matrix)
				count++
			}

			if (pool.count !== count)
				setHierarchyInstanceCount(pool, count)
		}
	}

	dispose() {
		//??
	}
}

