
import {Realm} from "./parts/realm.js"
import {makeRenderingFns} from "./rendering.js"
import {rafloop} from "./utils/rafloop.js"

export class Renderer {
	render

	constructor(realm: Realm) {
		const fns = makeRenderingFns(realm)
		this.render = () => fns.forEach(fn => fn())
	}

	renderLoop(fn: () => void) {
		return rafloop(() => {
			this.render()
			fn()
		})
	}
}

