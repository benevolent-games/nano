
import {GMap} from "@e280/stz"
import {makeActionsResolver} from "@benev/tact"

import {PlayerId} from "./players.js"
import {bindings} from "../parts/bindings.js"

export class Actor {
	readonly actions

	constructor(
			public resolveActions: ReturnType<typeof makeActionsResolver<typeof bindings>>,
		) {
		this.actions = resolveActions([])
	}
}

export class ActorMap extends GMap<PlayerId, Actor> {
	getActor(playerId: PlayerId) {
		return this.guarantee(playerId, () => {
			const resolveActions = makeActionsResolver(bindings)
			return new Actor(resolveActions)
		})
	}
}

