
import {makeRendererFns} from "./fns.js"
import {rafloop} from "./utils/rafloop.js"
import {Realm} from "../../lib/game/parts/realm.js"

export class Renderer {
	render

	constructor(realm: Realm) {
		const fns = makeRendererFns(realm)
		this.render = () => fns.forEach(fn => fn())
	}

	renderLoop() {
		return rafloop(this.render)
	}
}

