
import {Randy, Vec2} from "@benev/math"
import {Gridworld} from "./types.js"
import {initGridworld} from "./utils/grid.js"
import {carveDrunkenPathsBetweenWaypoints, getPointsAroundBorder, getRandomPointNearMiddle, southernFlooringGradient, splotchySubstrate} from "./utils/stages.js"

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

	carveDrunkenPathsBetweenWaypoints({
		grid,
		randy,
		paths: getPointsAroundBorder(grid, randy, 64)
			.map(point => ({from: point, to: navel})),
		thickness: 3,
		subdivisionDistance: 24,
		deviation: 10,
	})

	southernFlooringGradient(grid, randy, 0.25, 0.08)

	return grid
}
