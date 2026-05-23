
import {got} from "@e280/stz"
import {Rect, Vec2} from "@benev/math"

import {Pod} from "../parts/pod.js"
import {Phys} from "../utils/phys.js"

export const physical_forces = (pod: Pod) => () => {
	const gridworld = got(pod.entities.select("gridworld")[0][1]).gridworld
	const extent = Vec2.from(gridworld.extent)

	for (const [id, components] of pod.entities.select(
			"velocity", "position", "size",
		)) {

		const velocity = Vec2
			.from(components.velocity)
			.mulBy(pod.timing.delta / 1000)


		const hit = (physes: Iterable<Phys>) => {
			for (const phys of physes)
				if (phys.id !== id)
					return true
			return false
		}

		const canMoveTo = (position: Vec2) => {
			if (!components.physical) return true
			const rect = Rect.fromCenter(position, Vec2.from(components.size))
			if (
				rect.min.x < 0 ||
				rect.min.y < 0 ||
				rect.max.x > extent.x ||
				rect.max.y > extent.y
			) return false
			return !hit(pod.physLattice.query(rect))
		}

		const original = Vec2.from(components.position)
		let position = original.dup()

		// attempt x
		{
			const next = position.dup().add(new Vec2(velocity.x, 0))
			if (canMoveTo(next))
				position = next
		}

		// attempt y
		{
			const next = position.dup().add(new Vec2(0, velocity.y))
			if (canMoveTo(next))
				position = next
		}

		if (!position.equals(original))
			pod.change.merge(id, {position: position.array()})

		// slow down engine speed when we hit walls and stuff
		if (components.mech) {
			const intendedVelocity = Vec2.from(components.velocity)

			const actualVelocity = position
				.dup()
				.sub(original)
				.divBy(pod.timing.deltaSeconds)

			const intendedSpeed = intendedVelocity.magnitude()
			const actualSpeed = actualVelocity.magnitude()

			const survival = intendedSpeed > 0
				? actualSpeed / intendedSpeed
				: 0

			const rpm = components.mech.rpm * Math.min(1, survival)
			pod.change.merge(id, {
				velocity: actualVelocity.array(),
				mech: {...components.mech, rpm}
			})
		}
	}
}

