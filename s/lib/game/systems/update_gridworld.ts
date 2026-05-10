
import {Vec2} from "@benev/math"
import {lifecycle} from "@benev/archimedes"

import {asSystem} from "../utils/as-system.js"
import {initGridworld} from "../../gridworld/utils/grid.js"

export const update_gridworld = asSystem(pod => lifecycle(
	pod.entities,
	["gridworld"],
	(_id, components) => {
		const extent = Vec2.from(components.gridworld.extent)
		pod.gridworld = initGridworld(extent)
		return {
			tick: () => {},
			exit: () => {
				pod.gridworld = undefined
			},
		}
	},
))

