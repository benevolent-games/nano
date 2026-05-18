
import {Art} from "./art.js"
import {Graphic} from "./graphic.js"

export class Graphics {
	#figures = new Set<Graphic>()

	all() {
		return this.#figures.values()
	}

	has(figure: Graphic) {
		return this.#figures.has(figure)
	}

	instance(art: Art) {
		const figure = new Graphic(art)
		this.#figures.add(figure)
		const dispose = () => this.#figures.delete(figure)
		return [figure, dispose] as [figure: Graphic, dispose: () => void]
	}
}

