
import {Actions, makeActionsResolver} from "@benev/tact"
import {bindings} from "../parts/bindings.js"

export class Actor {
	constructor(
		public resolveActions: ReturnType<typeof makeActionsResolver>,
		public actions: Actions<typeof bindings>,
	) {}
}

