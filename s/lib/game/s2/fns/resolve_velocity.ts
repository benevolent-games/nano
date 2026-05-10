
import {Vec2} from "@benev/math"
import {system} from "../utils/system.js"

export const resolve_velocity = system(weave => () => {
	for (const [id, components] of weave.entities.select(
			"controlledBy", "velocity", "desire", "speed", "mass",
		)) {

		const velocity = Vec2.from(components.desire)
			.mulBy(components.speed)
			.mulBy(components.sprint && components.sprintFactor || 1)
			.divBy(components.mass ?? 1)
			.array()

		weave.change.merge(id, {velocity})
	}
})

