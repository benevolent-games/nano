
import {Art} from "./art.js"
import {ArtFn} from "./types.js"

export class Artwork<Context, Manifest> {
	static using<Context>() {
		return <Manifest>(manifestFn: (artFn: ArtFn<Context>) => Manifest) =>
			new Artwork<Context, Manifest>(manifestFn)
	}

	readonly manifest
	#set = new Set<Art<Context>>()

	constructor(manifestFn: (artFn: ArtFn<Context>) => Manifest) {
		this.manifest = manifestFn((capacity, resolve) => {
			const art = new Art(capacity, resolve)
			this.#set.add(art)
			return art
		})
	}

	[Symbol.iterator]() {
		return this.#set.values()
	}
}

