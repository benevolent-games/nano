
import {Bindings, makeActionsResolver} from "@benev/tact"

export class Actor<B extends Bindings> {
	readonly actions

	constructor(
			public resolveActions: ReturnType<typeof makeActionsResolver<B>>,
		) {
		this.actions = resolveActions([])
	}
}

