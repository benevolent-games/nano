
import {Actions} from "@benev/tact/core"
import {EntitiesReadonly} from "@benev/archimedes"

import {GameBindings} from "./bindings.js"
import {GameComponents} from "./components.js"

export class Space {
	constructor(
		public entities: EntitiesReadonly<GameComponents>,
		public actions: Actions<GameBindings>,
	) {}
}

