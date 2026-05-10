
import {render} from "./render.js"
import {Realm} from "./parts/realm.js"

export class Renderer {
	render

	constructor(realm: Realm) {
		this.render = render(realm)
	}
}

