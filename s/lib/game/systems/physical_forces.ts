
import {Vec2} from "@benev/math"
import {Pod} from "../parts/pod.js"
import {Phys} from "../utils/phys.js"
import {asSystem} from "../utils/as-system.js"
import {getShape} from "../utils/get-shape.js"

export const physical_forces = asSystem<Pod>(pod => () => {
	for (const [id, components] of pod.entities.select(
			"velocity", "position",
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
			const shape = getShape({position: position.array(), size: components.size, radius: components.radius})
			if (shape) return !hit(pod.physLattice.query(shape.boundingBox()))
			return true
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
	}
})

