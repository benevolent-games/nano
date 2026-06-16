
import {need} from "@e280/stz"
import {Vec2} from "@benev/math"
import {Pod} from "../parts/pod.js"

export const wish_mover = (pod: Pod) => () => {
	const swivel = pod.entities.select("cam")[0]?.[1].cam.swivel ?? 0

	for (const [id, components] of pod.entities.select("controlledBy", "wishMover")) {
		const actor = need(pod.actors, components.controlledBy)
		const a = actor.actions.mech

		const move = new Vec2()
		const aim = new Vec2()
		
		{
			const x = a.move_right.value - a.move_left.value
			const y = a.move_down.value - a.move_up.value
			move
				.set_(x, y)
				.clampMagnitude(1)
				.rotate(swivel)
		}

		{
			const x = a.look_right.value - a.look_left.value
			const y = a.look_down.value - a.look_up.value
			aim
				.set_(x, y)
				.clampMagnitude(1)
				.rotate(swivel)
		}

		pod.change.merge(id, {
			wishMover: {
				move: move.array(),
				aim: aim.array(),
				sprint: a.sprint.down,
			},
		})
	}
}

