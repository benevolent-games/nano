
import {Vec2} from "@benev/math"
import {Game} from "./game.js"
import {chunkify} from "../gridworld/chunk/chunkify.js"
import {generateGridworld} from "../gridworld/generate.js"

export function initialize(game: Game) {
	const extent = Vec2.all(128)
	const gridworld = generateGridworld(1, extent)

	game.change.create({gridworld: {extent: extent.array()}})

	for (const chunk of chunkify(gridworld))
		game.change.create(chunk)
}

