
import {guarantee, need} from "@e280/stz"
import {Art} from "./art.js"
import {Graphic} from "./graphic.js"
import {Pool} from "./utils/pool.js"
import {Graphics} from "./graphics.js"
import {instantiate, Prop} from "../buddy/buddy.js"
import {applyFigure} from "./utils/apply-figure.js"

export class Artist {
	#props: Prop[] = []
	#binds = new Map<Graphic, [Prop, () => void]>()
	#pools = new Map<Art, Pool<Prop>>()

	constructor(
		public figures: Graphics,
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

	render() {
		// create and/or update figure props
		for (const figure of this.figures.all()) {
			const [prop] = guarantee(this.#binds, figure, () => this.#getPool(figure.art).lease())
			applyFigure(figure, prop)
		}

		// release all figures not in use
		for (const [figure, [,release]] of this.#binds) {
			if (!this.figures.has(figure)) {
				release()
				this.#binds.delete(figure)
			}
		}
	}

	dispose() {
		for (const prop of this.#props)
			prop.dispose()
	}
}

