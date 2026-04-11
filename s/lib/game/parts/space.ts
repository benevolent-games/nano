
import {GMap} from "@e280/stz"
import {Actions} from "@benev/tact/core"
import {EntitiesReadonly, Id} from "@benev/archimedes"

import {GameBindings} from "./bindings.js"
import {GameComponents} from "./components.js"
import {Gridworld} from "../../gridworld/types.js"

export class Space {
	gridworlds = new GMap<Id, Gridworld>()

	constructor(
		public entities: EntitiesReadonly<GameComponents>,
		public actions: Actions<GameBindings>,
	) {}
}

