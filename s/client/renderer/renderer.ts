
import {Realm} from "./parts/realm.js"
import {rafloop} from "./utils/rafloop.js"
import {makeRenderingFns} from "./rendering.js"

export class Renderer {
	render

	constructor(realm: Realm) {
		const fns = makeRenderingFns(realm)
		this.render = () => {
			fns.forEach(fn => fn())
		}
	}

	renderLoop(fn: () => void) {
		return rafloop(() => {
			this.render()
			fn()
		})
	}
}

