
import {Vec2} from "@benev/math"
import {asSystems, lifecycle} from "@benev/archimedes"
import {Space} from "./parts/space.js"
import {GameComponents} from "./parts/components.js"
import {generateGridworld} from "../gridworld/generate.js"

export const systems = (space: Space) => asSystems<GameComponents>(change => [
	lifecycle(space.entities, ["gridworld"], (id, components) => {
		const {seed, extent} = components.gridworld
		space.gridworlds.guarantee(id, () => generateGridworld(seed, Vec2.from(extent)))
		return {
			tick(_id, _components) {},
			exit(id) {
				space.gridworlds.delete(id)
			},
		}
	}),
])

