
import {got, need, Rand, seed} from "@e280/stz"

import {Pod} from "../parts/pod.js"
import {chooseSpawnpoint} from "../../gridworld/utils/choose-spawnpoint.js"
import { spawnMech } from "../routines/spawn-mech.js"

export const player_spawning = (pod: Pod) => () => {

	// players that are alive
	const playersThatAreAlive = [...pod.entities.select("controlledBy")]
		.map(([,c]) => c.controlledBy)

	// spawn robots
	for (const [controlledBy] of pod.entities.select("intents")) {
		if (playersThatAreAlive.includes(controlledBy))
			continue

		const actor = need(pod.actors, controlledBy)

		if (actor.actions.spectator.spawn.changedDown) {
			const hologrid = got(pod.hologrid)
			const position = chooseSpawnpoint(hologrid.gridworld, new Rand(seed(pod.timing.tick)))
				.add_(0.5, 0.5)
				.array()
			spawnMech(pod.change, {controlledBy, position})
		}
	}
}

