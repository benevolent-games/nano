
import {Art} from "./art.js"
import {Prop} from "./types.js"

export type NewArt<Context> = (capacity: number, resolve: (context: Context) => Prop) => Art<Context>

export class Artwork<Context, Manifest> {
	static using<Context>() {
		return <Manifest>(fn: (newArt: NewArt<Context>) => Manifest) =>
			new Artwork<Context, Manifest>(fn)
	}

	readonly manifest
	#set = new Set<Art<Context>>()

	constructor(fn: (newArt: NewArt<Context>) => Manifest) {
		this.manifest = fn((capacity, resolve) => {
			const art = new Art(capacity, resolve)
			this.#set.add(art)
			return art
		})
	}

	[Symbol.iterator]() {
		return this.#set.values()
	}
}

