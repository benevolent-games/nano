
import {Realm} from "./parts/realm.js"
import {rafloop} from "./utils/rafloop.js"
import {makeRenderingFns} from "./rendering.js"

export class Renderer {
	tickMs = 0
	render

	constructor(realm: Realm) {
		const fns = makeRenderingFns(realm)
		this.render = () => {
			const start = performance.now()
			fns.forEach(fn => fn())
			this.tickMs = performance.now() - start
		}
	}

	renderLoop(fn: () => void) {
		return rafloop(() => {
			this.render()
			fn()
		})
	}
}

