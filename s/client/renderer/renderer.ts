
import {Realm} from "./parts/realm.js"
import {makeRenderingFns} from "./rendering.js"
import {rafloop} from "./utils/rafloop.js"
import {Space} from "../../lib/game/parts/space.js"

export class Renderer {
	render

	constructor(space: Space, realm: Realm) {
		const fns = makeRenderingFns(space, realm)
		this.render = () => fns.forEach(fn => fn())
	}

	renderLoop(fn: () => void) {
		return rafloop(() => {
			this.render()
			fn()
		})
	}
}

