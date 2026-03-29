
import {Randy, Vec2} from "@benev/math"
import {Gridworld, TileKind} from "./types.js"
import {connectWaypointsWithFlooring, drawBorder, drawSplotchyTileSubstrate, initGridworld} from "./utils/utils.js"

export const generateGridworld = (seed: number, extent: Vec2): Gridworld => {
	const grid = initGridworld(extent)
	const randy = new Randy(seed)
	drawSplotchyTileSubstrate(grid, randy)
	connectWaypointsWithFlooring(grid, randy)
	drawBorder(grid, 1, TileKind.Floor)
	return grid
}

