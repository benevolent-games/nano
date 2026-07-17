
import {effect} from "@e280/strata"
import {cycle, nap} from "@e280/stz"
import {useMount, useOnce} from "@e280/sly"

import {GameInit} from "../../../types.js"
import {consts} from "../../../../consts.js"
import {Game} from "../../../../lib/game/game.js"
import {Recruiter} from "../../../utils/recruiter.js"
import {GameDeck} from "../../../parts/setup-deck.js"
import {IntentBucketMap} from "../../../../lib/game/utils/intent-bucket-map.js"

export function useGame(deck: GameDeck, init: GameInit) {

	// teeing off the game intent buckets vs meta intent buckets which are sampled at differing rates
	const gamePlayers = useOnce(() => new IntentBucketMap())
	const metaPlayers = useOnce(() => new IntentBucketMap())
	const recruiter = useOnce(() => new Recruiter([gamePlayers, metaPlayers]))
	useMount(() => effect(() => recruiter.syncWithPorts(deck.ports)))
	useMount(() => recruiter.samplingLoop())

	const game = useOnce(() => new Game(gamePlayers).init())
	useMount(() => init(game))
	useMount(() => cycle(async() => {
		// TODO probably inject intents into the game simulation from here (not from a system fn which is inside-out)
		game.simulate()
		await nap(1000 / consts.simulationHz.max)
	}))

	return {game, recruiter}
}

