
import {Vec2} from "@benev/math"
import {asSystems} from "@benev/archimedes"

import {Space} from "./parts/space.js"
import {GameComponents} from "./parts/components.js"
import {Gridspace} from "../gridworld/utils/gridspace.js"

export const systems = (space: Space) => asSystems<GameComponents>(change => [
	function movement() {
		const a = space.actions.control
		const speed = 0.5

		const intent = new Gridspace(0, 0)
			.add_(
				a.move_right.value - a.move_left.value,
				a.move_down.value - a.move_up.value,
			)
			.clampMagnitude(1)
			.mulBy(speed)

		for (const [id, components] of space.entities.select("controllable", "position")) {
			const originalPosition = Vec2.from(components.position)
			const position = originalPosition.dup().add(intent).array()
			change.merge(id, {position})
		}
	},
])

