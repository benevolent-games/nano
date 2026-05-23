
import {need} from "@e280/stz"
import {Pod} from "../parts/pod.js"

export const wish_interactor = (pod: Pod) => () => {
	for (const [id, components] of pod.entities.select("controlledBy", "wishInteractor")) {
		const actor = need(pod.actors, components.controlledBy)
		const a = actor.actions.mech

		pod.change.merge(id, {
			wishInteractor: {
				pickup: a.pickup.changedDown,
				drop: a.drop.changedDown,
				use: a.use.changedDown,
				unequip: a.unequip.changedDown,
			},
		})
	}
}

