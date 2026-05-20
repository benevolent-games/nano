

import {got} from "@e280/stz"
import {abs, circularApproach, circularDelta, degrees, halflife, lerp, Vec2} from "@benev/math"
import {Pod} from "../parts/pod.js"
import {mechStats} from "../parts/mech.js"

export const mech = {
	mobility: (pod: Pod) => () => {
		const {delta, deltaSeconds} = pod.timing

		for (const [id, components] of pod.entities.select("mech", "desire", "rotation", "sprint", "velocity", "engineSpeed")) {
			const lowerStats = got(mechStats.lower[components.mech.lower])
			const upperStats = got(mechStats.upper[components.mech.upper])
			const mass = lowerStats.mass + upperStats.mass

			const desire = Vec2.from(components.desire)
			const desiredRotation = desire.dup().normalize().rotation()

			const desirable = desire.magnitude() > 0.02
			const going = components.engineSpeed > 0.5
			const forward = Vec2.rotation(components.rotation)
			const isPointingInReverse = abs(circularDelta(desiredRotation, components.rotation)) > degrees(100)

			const isBraking = desirable && going && isPointingInReverse

			// steering
			if (desirable && !isBraking) {
				const rotation = circularApproach(components.rotation, desiredRotation, lowerStats.turnSpeed * deltaSeconds)
				pod.change.merge(id, {rotation})
			}

			// gas/brake
			{
				const sprintFactor = components.sprint ? lowerStats.sprintFactor : 1
				const power = (sprintFactor * lowerStats.power)
				const gas = components.sprint ? (lowerStats.gasHalftime / lowerStats.sprintFactor) : lowerStats.gasHalftime

				const topSpeed = power / mass
				const engineTarget = desire.magnitude() * topSpeed
				const aligned = abs(circularDelta(desiredRotation, components.rotation)) < degrees(90)

				const engineSpeed = (isBraking || !aligned)
					? lerp(components.engineSpeed, 0, halflife(lowerStats.brakeHalftime, delta))
					: lerp(components.engineSpeed, engineTarget, halflife(gas, delta))

				pod.change.merge(id, {
					velocity: forward.mulBy(engineSpeed).array(),
					engineSpeed,
				})
			}
		}
	},
}

// export const resolve_velocity = (pod: Pod) => () => {
// 	for (const [id, components] of pod.entities.select(
// 			"controlledBy", "velocity", "desire", "speed", "mass",
// 		)) {
//
// 		const velocity = Vec2.from(components.desire)
// 			.mulBy(components.speed)
// 			.mulBy(components.sprint && components.sprintFactor || 1)
// 			.divBy(components.mass ?? 1)
// 			.array()
//
// 		pod.change.merge(id, {velocity})
// 	}
// }
//
//
