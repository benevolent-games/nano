
import {Randy} from "@benev/math"
import {system} from "../utils/system.js"
import {need} from "../../../tools/need.js"
import {makeRobot} from "../../archetypes/robot.js"
import {chooseSpawnpoint} from "../../../gridworld/utils/choose-spawnpoint.js"

export const robot_spawning = system(weave => () => {

	// players that are alive
	const playersThatAreAlive = [...weave.entities.select("controlledBy")]
		.map(([,c]) => c.controlledBy)

	// spawn robots
	for (const [controlledBy] of weave.entities.select("intents")) {
		if (playersThatAreAlive.includes(controlledBy)) continue
		const actor = weave.actors.need(controlledBy)
		if (actor.actions.spectator.spawn.changedDown) {
			const gridworld = need(weave.gridworld)
			const position = chooseSpawnpoint(gridworld, new Randy(weave.timing.tick)).array()
			weave.change.create({...makeRobot(), controlledBy, position})
		}
	}
})

