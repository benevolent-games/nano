
import {Randy} from "@benev/math"
import {Gridworld} from "../types.js"
import {Gridspace} from "./gridspace.js"

export function chooseSpawnpoint(gridworld: Gridworld, randy: Randy) {
	const startpoint = new Gridspace(
		randy.integerRange(0, gridworld.extent.x - 1),
		gridworld.extent.y - 1,
	)
	return startpoint
}

