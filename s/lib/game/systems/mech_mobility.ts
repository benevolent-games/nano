
import {abs, circularApproach, circularDelta, degrees, halflife, lerp, Vec2} from "@benev/math"
import {Pod} from "../parts/pod.js"

export const mech_mobility = (pod: Pod) => () => {
	const {delta, deltaSeconds} = pod.timing

	for (const [id, components] of pod.entities.select("mech", "wishMove", "lowerRotation", "sprint", "velocity", "engineSpeed")) {
		const {lower, upper} = components.mech
		const mass = lower.mass + upper.mass

		const desire = Vec2.from(components.wishMove)
		const desiredRotation = desire.dup().normalize().rotation()

		const desirable = desire.magnitude() > 0.02
		const going = components.engineSpeed > 0.5
		const forward = Vec2.rotation(components.lowerRotation)
		const isPointingInReverse = abs(circularDelta(desiredRotation, components.lowerRotation)) > degrees(100)

		const isBraking = desirable && going && isPointingInReverse

		// steering
		if (desirable && !isBraking) {
			const lowerRotation = circularApproach(components.lowerRotation, desiredRotation, lower.turnSpeed * deltaSeconds)
			pod.change.merge(id, {lowerRotation})
		}

		// gas/brake
		{
			const sprintFactor = components.sprint ? lower.sprintFactor : 1
			const power = (sprintFactor * lower.power)
			const gas = components.sprint ? (lower.gasHalftime / lower.sprintFactor) : lower.gasHalftime

			const topSpeed = power / mass
			const engineTarget = desire.magnitude() * topSpeed
			const aligned = abs(circularDelta(desiredRotation, components.lowerRotation)) < degrees(90)

			const engineSpeed = (isBraking || !aligned)
				? lerp(components.engineSpeed, 0, halflife(lower.brakeHalftime, delta))
				: lerp(components.engineSpeed, engineTarget, halflife(gas, delta))

			pod.change.merge(id, {
				velocity: forward.mulBy(engineSpeed).array(),
				engineSpeed,
			})
		}
	}
}

