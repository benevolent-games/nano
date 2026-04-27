
import {Vec2} from "@benev/math"
import {Game} from "./game.js"
import {chunkify} from "../gridworld/chunk/chunkify.js"
import {generateGridworld} from "../gridworld/generate.js"

export function initialize(game: Game) {
	const gridworld = generateGridworld(1, Vec2.all(64))

	for (const chunk of chunkify(gridworld))
		game.change.create(chunk)

	game.change.create({
		graphic: "robot",
		controllable: true,
		intent: [0, 0],
		position: [0, 0],
		physical: true,
		radius: 0.4,
		mass: 1,
		lerp: 0.4,
		velocity: [0, 0],
		speed: 5,
	})
}

