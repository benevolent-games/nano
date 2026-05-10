
import {Circular, degrees} from "@benev/math"
import {Pod} from "../parts/pod.js"
import {asSystem} from "../../tools/ecs-plus/as-system.js"
import {Gridspace} from "../../gridworld/utils/gridspace.js"

export const control_movements_and_rotations = asSystem<Pod>(pod => () => {
	for (const [id, components] of pod.entities.select("controlledBy")) {
		if (!components.controlledBy) continue
		const actor = pod.actors.need(components.controlledBy)
		const a = actor.actions.robot

		if ("desire" in components) {
			const x = a.move_right.value - a.move_left.value
			const y = a.move_down.value - a.move_up.value
			const desire = new Gridspace(x, y)
				.clampMagnitude(1)
				.rotate(components.cam?.swivel ?? 0)
			pod.change.merge(id, {desire: desire.array()})

			if ("rotation" in components) {
				if (desire.magnitude() > 0.1) {
					const target = degrees(270) - desire.rotation()
					const rotation = Circular.lerp(components.rotation ?? 0, target, components.lerp ?? 1)
					pod.change.merge(id, {rotation})
				}
			}
		}

		if ("rotation" in components && !components.sprint) {
			const x = a.look_left.value - a.look_right.value
			const y = a.look_down.value - a.look_up.value
			const lookIntent = new Gridspace(x, y).clampMagnitude(1)
			if (lookIntent.magnitude() > 0.1) {
				const rotation = lookIntent.rotation() + degrees(90) - (components.cam?.swivel ?? 0)
				pod.change.merge(id, {rotation})
			}
		}

		if ("sprint" in components) {
			pod.change.merge(id, {sprint: !!a.sprint.value})
		}
	}
})

