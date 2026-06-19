
import {guarantee, need} from "@e280/stz"
import {Art} from "./art.js"
import {Graphic} from "./graphic.js"
import {Pool} from "./utils/pool.js"
import {Graphics} from "./graphics.js"
import {instantiate, Prop} from "../../lib/buddy/buddy.js"
import {applyGraphic} from "./utils/apply-graphic.js"

/** responsible for rendering graphics with efficient instance pooling. */
export class Artist {
	#props: Prop[] = []
	#binds = new Map<Graphic, [Prop, () => void]>()
	#pools = new Map<Art, Pool<Prop>>()

	constructor(
		public graphics: Graphics,
		private source: Map<string, Prop>,
	) {}

	#getPool(art: Art) {
		return guarantee(this.#pools, art, () => new Pool<Prop>(() => {
			const instance = instantiate(need(this.source, art.name))
			this.#props.push(instance)
			return {
				item: instance,
				enable: () => instance.setEnabled(true),
				disable: () => instance.setEnabled(false),
			}
		}).prepopulate(art.prepopulation))
	}

	preload(arts: Art[]) {
		for (const art of arts)
			this.#getPool(art)
	}

	render() {
		// create and/or update props for graphics
		for (const graphic of this.graphics.all()) {
			const [prop] = guarantee(this.#binds, graphic, () => this.#getPool(graphic.art).lease())
			applyGraphic(graphic, prop)
		}

		// release all graphics not in use
		for (const [graphic, [,release]] of this.#binds) {
			if (!this.graphics.has(graphic)) {
				release()
				this.#binds.delete(graphic)
			}
		}
	}

	dispose() {
		for (const prop of this.#props)
			prop.dispose()
	}
}

