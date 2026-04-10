
import {makeRendererFns} from "./fns.js"
import {rafloop} from "./utils/rafloop.js"
import {Space} from "../../lib/game/parts/space.js"

export class Renderer {
	render

	constructor(space: Space) {
		const fns = makeRendererFns(space)
		this.render = () => fns.forEach(fn => fn())
	}

	renderLoop() {
		return rafloop(this.render)
	}
}

