
import {lifecycle} from "@benev/archimedes"
import {Space} from "../../lib/game/parts/space.js"

export const makeRendererFns = (space: Space) => [
	lifecycle(space.entities, ["gridworld"], params => {
		return {
			tick(id, components) {},
			exit(id) {},
		}
	}),
]

