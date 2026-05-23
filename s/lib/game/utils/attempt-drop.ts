
import {count} from "@e280/stz"
import {Id} from "@benev/archimedes"
import {degrees, Rect, Vec2} from "@benev/math"
import {Pod} from "../parts/pod.js"

export function attemptDrop({pod, itemId, dropspot, deviation}: {
		pod: Pod
		itemId: Id
		dropspot: Vec2
		deviation: number
	}) {

	let destination: Vec2 | null = null

	const isValid = (vec: Vec2) => {
		const collisions = [...pod.physLattice.query(Rect.point(vec))]
		return collisions.length === 0
	}

	for (const _ of count(10)) {
		const proposal = dropspot.dup().add_(
			pod.rand.range(-deviation, deviation),
			pod.rand.range(-deviation, deviation),
		)
		if (isValid(proposal)) {
			destination = proposal
			break
		}
	}

	if (destination) {
		const rotation = pod.rand.range(degrees(0), degrees(360))
		pod.change.drop(itemId, "containerId")
		pod.change.merge(itemId, {pickupable: true, targetable: true, rotation, position: destination.array()})
		return true
	}

	return false
}

