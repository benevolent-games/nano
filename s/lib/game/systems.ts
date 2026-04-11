
import {Vec2} from "@benev/math"
import {asSystems, lifecycle} from "@benev/archimedes"

import {Space} from "./parts/space.js"
import {Gridspace} from "./parts/units.js"
import {GameComponents} from "./parts/components.js"
import {generateGridworld} from "../gridworld/generate.js"

export const systems = (space: Space) => asSystems<GameComponents>(change => [
	lifecycle(space.entities, ["gridworld"], (id, components) => {
		const {seed, extent} = components.gridworld

		space.gridworlds.guarantee(id, () => generateGridworld(seed, Vec2.from(extent)))
		change.merge(id, {ready: true})

		return {
			tick(_id, _components) {},
			exit(id) {
				space.gridworlds.delete(id)
			},
		}
	}),

	function movement() {
		const a = space.actions.control
		const speed = 0.2

		const intent = new Gridspace(0, 0)
			.add_(
				a.move_right.value - a.move_left.value,
				a.move_down.value - a.move_up.value,
			)
			.clampMagnitude(1)
			.mulBy(speed)

		for (const [id, components] of space.entities.select("controllable", "position")) {
			const position = Vec2.from(components.position).add(intent).array()
			change.merge(id, {position})
		}
	},
])

