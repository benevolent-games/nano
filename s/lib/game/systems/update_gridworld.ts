
import {Vec2} from "@benev/math"
import {lifecycle} from "@benev/archimedes"

import {Pod} from "../parts/pod.js"
import {initGridworld} from "../../gridworld/utils/grid.js"

export const update_gridworld = (pod: Pod) => lifecycle(
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
)

