
import {Vec2} from "@benev/math"
import {Game} from "./game.js"
import {chunkify} from "../gridworld/chunk/chunkify.js"
import {generateGridworld} from "../gridworld/generate.js"

export function initialize(game: Game) {
	const gridworld = generateGridworld(1, Vec2.all(64))

	for (const chunk of chunkify(gridworld))
		game.change.create(chunk)
}

