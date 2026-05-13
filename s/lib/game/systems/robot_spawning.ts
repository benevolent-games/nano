
import {Rand, seed} from "@benev/math"
import {got, need} from "@e280/stz"

import {Pod} from "../parts/pod.js"
import {makeRobot} from "../archetypes/robot.js"
import {chooseSpawnpoint} from "../../gridworld/utils/choose-spawnpoint.js"

export const robot_spawning = (pod: Pod) => () => {

	// players that are alive
	const playersThatAreAlive = [...pod.entities.select("controlledBy")]
		.map(([,c]) => c.controlledBy)

	// spawn robots
	for (const [controlledBy] of pod.entities.select("intents")) {
		if (playersThatAreAlive.includes(controlledBy)) continue
		const actor = need(pod.actors, controlledBy)
		if (actor.actions.spectator.spawn.changedDown) {
			const gridworld = got(pod.gridworld)
			const position = chooseSpawnpoint(gridworld, new Rand(seed(pod.timing.tick)))
				.add_(0.5, 0.5)
				.array()
			pod.change.create({...makeRobot(), controlledBy, position})
		}
	}
}

