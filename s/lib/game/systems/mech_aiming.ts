
import {got} from "@e280/stz"
import {Pod} from "../parts/pod.js"
import {circularApproach, Vec2} from "@benev/math"

export const mech_aiming = (pod: Pod) => () => {
	const {deltaSeconds} = pod.timing

	for (const [id, components] of pod.entities.select("mechBuild", "wishMover", "rotation")) {
		const {wishMover} = components
		const {mechUpper} = got(pod.entities.getWith(components.mechBuild.upper, "mechUpper"))

		const wishAim = Vec2.from(wishMover.aim)
		const wishMove = Vec2.from(wishMover.move)

		let aimTarget = components.rotation

		if (wishMover.sprint && wishMove.magnitude() > 0.1)
			aimTarget = wishMove.rotation()
		else if (wishAim.magnitude() > 0.1)
			aimTarget = wishAim.rotation()
		else if (wishMove.magnitude() > 0.1)
			aimTarget = wishMove.rotation()

		const rotation = circularApproach(components.rotation, aimTarget, mechUpper.aimSpeed * deltaSeconds)
		pod.change.merge(id, {rotation})
	}
}

