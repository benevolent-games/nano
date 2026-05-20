
import {Rect, Vec2} from "@benev/math"

import {Pod} from "../parts/pod.js"
import {Phys} from "../utils/phys.js"

export const physical_forces = (pod: Pod) => () => {
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
		if ("engineSpeed" in components) {
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

			const engineSpeed = components.engineSpeed! * Math.min(1, survival)

			pod.change.merge(id, {
				velocity: actualVelocity.array(),
				engineSpeed,
			})
		}
	}
}

