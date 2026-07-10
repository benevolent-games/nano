
import {guarantee} from "@e280/stz"
import {Art} from "./art.js"
import {Instance} from "./instance.js"

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

