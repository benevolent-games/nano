
import {Pod} from "../parts/pod.js"
import {asSystem} from "../../tools/ecs-plus/as-system.js"

export const ingest_player_intents = asSystem<Pod>(pod => () => {
	const {players, entities, change, actors} = pod

	// lifecycling for player entities based on players map
	if (players) {

		// add fresh players
		for (const [id, playerIntents] of players) {
			const intents = playerIntents.take()
			if (entities.has(id)) change.merge(id, {intents})
			else change.set(id, {intents})
		}

		// delete stale players
		for (const [playerId] of entities.select("intents")) {
			if (!players.has(playerId)) {

				// delete player entity
				change.delete(playerId)

				// delete any robots this player owns
				for (const [id2, c] of entities.select("controlledBy")) {
					if (c.controlledBy === playerId)
						change.delete(id2)
				}
			}
		}
	}

	// resolving actions
	for (const [id, {intents}] of entities.select("intents"))
		actors.getActor(id).resolveActions(intents)
})

