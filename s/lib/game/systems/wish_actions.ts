
import {need} from "@e280/stz"
import {Pod} from "../parts/pod.js"

export const wish_actions = (pod: Pod) => () => {
	for (const [id, components] of pod.entities.select("controlledBy", "wishActions")) {
		const actor = need(pod.actors, components.controlledBy)
		const a = actor.actions.mech

		pod.change.merge(id, {
			wishActions: {
				a1: a.action1.down,
				a2: a.action2.down,
				a3: a.action3.down,
				a4: a.action4.down,
			},
		})
	}
}

