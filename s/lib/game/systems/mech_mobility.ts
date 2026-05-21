
import {got} from "@e280/stz"
import {abs, circularApproach, circularDelta, degrees, halflife, lerp, Vec2} from "@benev/math"
import {Pod} from "../parts/pod.js"

export const mech_mobility = (pod: Pod) => () => {
	const {delta, deltaSeconds} = pod.timing

	for (const [id, components] of pod.entities.select("mech", "mechBuild", "wishMover", "velocity")) {
		const mech = structuredClone(components.mech)
		const velocity = Vec2.zero()

		const {mechLower} = got(pod.entities.getWith(components.mechBuild.lower, "mechLower"))
		const {mechUpper} = got(pod.entities.getWith(components.mechBuild.upper, "mechUpper"))
		const {wishMover} = components

		const mass = mechLower.mass + mechUpper.mass
		const desire = Vec2.from(wishMover.move)
		const desiredRotation = desire.dup().normalize().rotation()
		const desirable = desire.magnitude() > 0.02
		const going = mech.rpm > 0.5
		const isPointingInReverse = abs(circularDelta(desiredRotation, mech.chassisRotation)) > degrees(100)
		const isBraking = desirable && going && isPointingInReverse

		// steering
		if (desirable && !isBraking) {
			const rotation = circularApproach(mech.chassisRotation, desiredRotation, mechLower.turnSpeed * deltaSeconds)
			mech.chassisRotation = rotation
		}

		// gas/brake
		{
			const forward = Vec2.rotation(mech.chassisRotation)
			const sprintFactor = wishMover.sprint ? mechLower.sprintFactor : 1
			const power = (sprintFactor * mechLower.power)
			const gas = wishMover.sprint ? (mechLower.gasHalftime / mechLower.sprintFactor) : mechLower.gasHalftime

			const topSpeed = power / mass
			const engineTarget = desire.magnitude() * topSpeed
			const aligned = abs(circularDelta(desiredRotation, mech.chassisRotation)) < degrees(90)

			mech.rpm = (isBraking || !aligned)
				? lerp(mech.rpm, 0, halflife(mechLower.brakeHalftime, delta))
				: lerp(mech.rpm, engineTarget, halflife(gas, delta))

			velocity.set(forward).mulBy(mech.rpm)
		}

		pod.change.merge(id, {
			mech,
			velocity: velocity.array(),
		})
	}
}

