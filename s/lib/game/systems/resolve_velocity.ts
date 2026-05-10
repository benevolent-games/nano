
import {Vec2} from "@benev/math"
import {Pod} from "../parts/pod.js"
import {asSystem} from "../../tools/ecs-plus/as-system.js"

export const resolve_velocity = asSystem<Pod>(pod => () => {
	for (const [id, components] of pod.entities.select(
			"controlledBy", "velocity", "desire", "speed", "mass",
		)) {

		const velocity = Vec2.from(components.desire)
			.mulBy(components.speed)
			.mulBy(components.sprint && components.sprintFactor || 1)
			.divBy(components.mass ?? 1)
			.array()

		pod.change.merge(id, {velocity})
	}
})

