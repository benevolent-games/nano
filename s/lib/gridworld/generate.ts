
import {Randy, Vec2} from "@benev/math"
import {Gridworld} from "./types.js"
import {initGridworld} from "./utils/utils.js"

export const generateGridworld = (seed: number, extent: Vec2): Gridworld => {
	const grid = initGridworld(extent)
	const randy = new Randy(seed)
	const navel = getRandomPointNearMiddle(grid, randy, 0.25)

	splotchySubstrate({
		grid,
		randy,
		walls: {
			probability: 0.5,
			scales: [0.01, 0.2],
		},
		pits: {
			probability: 0.25,
			scales: [0.01, 0.2],
		},
	})

	carveDrunkenPathsBetweenWaypoints(
		getPointsAroundBorder()
			.map(point => ({from: point, to: navel}))
	)

	southernFlooringGradient(grid, randy, 0.25)

	return grid
}

