
import {Rand} from "@e280/stz"
import {Gridworld} from "../types.js"
import {Gridspace} from "./gridspace.js"

export function chooseSpawnpoint(gridworld: Gridworld, rand: Rand) {
	const startpoint = new Gridspace(
		rand.integerRange(0, gridworld.extent.x - 1),
		gridworld.extent.y - 1,
	)
	return startpoint
}

