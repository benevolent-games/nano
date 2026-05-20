
import {Pod} from "../parts/pod.js"
import {circularApproach, Vec2} from "@benev/math"

export const mech_aiming = (pod: Pod) => () => {
	const {deltaSeconds} = pod.timing

	for (const [id, components] of pod.entities.select("mech", "wishAim", "wishMove", "rotation", "sprint")) {
		const {upper} = components.mech
		const wishAim = Vec2.from(components.wishAim)
		const wishMove = Vec2.from(components.wishMove)

		let aimTarget = components.rotation

		if (components.sprint && wishMove.magnitude() > 0.1)
			aimTarget = wishMove.rotation()
		else if (wishAim.magnitude() > 0.1)
			aimTarget = wishAim.rotation()
		else if (wishMove.magnitude() > 0.1)
			aimTarget = wishMove.rotation()

		const rotation = circularApproach(components.rotation, aimTarget, upper.aimSpeed * deltaSeconds)
		pod.change.merge(id, {rotation})
	}
}

