
import {html} from "lit"
import {effect} from "@e280/strata"
import {cycle, GMap, nap} from "@e280/stz"
import {Deck, IntentBucket} from "@benev/tact"
import {shadow, spinner, useCss, useMount, useName, useOnce} from "@e280/sly"

import styleCss from "./style.css.js"
import {consts} from "../../../consts.js"
import {theme} from "../../utils/theme.js"
import {Game} from "../../../lib/game/game.js"
import {Multiframe} from "../../utils/multiframe.js"
import {Perspective} from "./subviews/perspective.js"
import {initialize} from "../../../lib/game/initialize.js"
import {PlayerId} from "../../../lib/game/utils/players.js"
import {IntentBucketMap, Recruiter} from "./parts/recruiter.js"
import {Actor, ActorMap} from "../../../lib/game/utils/actor.js"

export class Seat {
	actors = new GMap<PlayerId, Actor>()
	intentBuckets = new GMap<PlayerId, IntentBucket>()
}

export const Play = shadow((deck: Deck) => {
	useName("play")
	useCss(theme(), styleCss)

	const gamePlayers = useOnce(() => new IntentBucketMap())
	const metaPlayers = useOnce(() => new IntentBucketMap())
	const players = useOnce(() => new Recruiter(deck, [gamePlayers, metaPlayers]))
	useMount(() => effect(() => players.syncWithPorts()))
	useMount(() => players.samplingLoop())

	// special separate 'meta' handling of things like menu buttons
	const metaActors = useOnce(() => new ActorMap())
	useMount(() => cycle(async() => {
		for (const [playerId, intents] of metaPlayers) {
			const actions = metaActors.getActor(playerId).resolveActions(intents.take())
			if (actions.meta.menu.changedDown) {
				console.log("menu!!", playerId)
			}
		}
		await nap(1000 / 120)
	}))

	const game = useOnce(() => {
		const game = new Game(gamePlayers)
		initialize(game)
		return game
	})

	useMount(() => cycle(async() => {
		game.simulate()
		await nap(1000 / consts.simulationHz.max)
	}))

	const multiframe = useOnce(() => new Multiframe(game.entities.readonly))
	useMount(() => effect(() => multiframe.sync(players)))

	return html`
		<div class=shell>
			${multiframe.frames.map($frame => spinner($frame(), Perspective))}
		</div>
	`
})

