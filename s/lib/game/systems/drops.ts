
import {count, need} from "@e280/stz"
import {degrees, Rect, Vec2} from "@benev/math"

import {Pod} from "../parts/pod.js"
import {consts} from "../../../consts.js"
import {selrect} from "../utils/selrect.js"

export const drops = (pod: Pod) => () => {
	for (const [id, components] of pod.entities.select("inventory", "position", "rotation", "reach", "controlledBy")) {
		const a = need(pod.actors, components.controlledBy).actions.robot
		const hasItems = components.inventory.items.length > 0

		const jitter = components.reach / 2

		if (a.drop.changedDown && hasItems) {
			const items = [...components.inventory.items]
			const topItem = items.pop()!
			const aimpoint = selrect(components).center()

			let destination: Vec2 | null = null

			const isValid = (vec: Vec2) => {
				const collisions = [...pod.physLattice.query(Rect.point(vec))]
				return collisions.length === 0
			}

			for (const _ of count(10)) {
				const proposal = aimpoint.dup().add_(
					pod.rand.range(-jitter, jitter),
					pod.rand.range(-jitter, jitter),
				)
				if (isValid(proposal)) {
					destination = proposal
					break
				}
			}

			if (destination) {
				// place onto ground
				pod.change.create({
					size: [consts.robotScale, consts.robotScale],
					position: destination.array(),
					pickupable: topItem,
					rotation: pod.rand.range(degrees(0), degrees(360)),
					targetable: true,
				})

				// remove from inventory
				pod.change.merge(id, {inventory: {...components.inventory, items}})
			}
		}
	}
}

