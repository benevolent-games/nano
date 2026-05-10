
import {Vec2} from "@benev/math"
import {lifecycle} from "@benev/archimedes"

import {system} from "../utils/system.js"
import {initGridworld} from "../../../gridworld/utils/grid.js"

export const update_gridworld = system(weave => lifecycle(
	weave.entities,
	["gridworld"],
	(_id, components) => {
		const extent = Vec2.from(components.gridworld.extent)
		weave.gridworld = initGridworld(extent)
		return {
			tick: () => {},
			exit: () => {
				weave.gridworld = undefined
			},
		}
	},
))

