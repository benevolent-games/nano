
import {need} from "@e280/stz"
import {Vec2} from "@benev/math"

import {Pod} from "../parts/pod.js"
import {Gridspace} from "../../gridworld/utils/gridspace.js"

export const control_movements_and_rotations = (pod: Pod) => () => {
	for (const [id, components] of pod.entities.select("controlledBy")) {
		if (!components.controlledBy) continue
		
		const actor = need(pod.actors, components.controlledBy)
		const a = actor.actions.robot

		if ("wishMove" in components) {
			const x = a.move_right.value - a.move_left.value
			const y = a.move_down.value - a.move_up.value
			const wishMove = new Gridspace(x, y)
				.clampMagnitude(1)
				.rotate(components.cam?.swivel ?? 0)
			pod.change.merge(id, {wishMove: wishMove.array()})
		}

		if ("wishAim" in components) {
			const x = a.look_right.value - a.look_left.value
			const y = a.look_down.value - a.look_up.value
			const wishAim = new Vec2(x, y).clampMagnitude(1)
			pod.change.merge(id, {wishAim: wishAim.array()})
		}

		if ("sprint" in components) {
			pod.change.merge(id, {sprint: !!a.sprint.value})
		}
	}
}

