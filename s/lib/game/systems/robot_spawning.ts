
import {Randy} from "@benev/math"
import {Pod} from "../parts/pod.js"
import {need} from "../../tools/need.js"
import {asSystem} from "../utils/as-system.js"
import {makeRobot} from "../archetypes/robot.js"
import {chooseSpawnpoint} from "../../gridworld/utils/choose-spawnpoint.js"

export const robot_spawning = asSystem<Pod>(pod => () => {

	// players that are alive
	const playersThatAreAlive = [...pod.entities.select("controlledBy")]
		.map(([,c]) => c.controlledBy)

	// spawn robots
	for (const [controlledBy] of pod.entities.select("intents")) {
		if (playersThatAreAlive.includes(controlledBy)) continue
		const actor = pod.actors.need(controlledBy)
		if (actor.actions.spectator.spawn.changedDown) {
			const gridworld = need(pod.gridworld)
			const position = chooseSpawnpoint(gridworld, new Randy(pod.timing.tick))
				.add_(0.5, 0.5)
				.array()
			pod.change.create({...makeRobot(), controlledBy, position})
		}
	}
})

