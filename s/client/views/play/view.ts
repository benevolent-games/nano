
import {html} from "lit"
import {effect} from "@e280/strata"
import {cycle, nap} from "@e280/stz"
import {shadowElement, spinner, useCss, useMount, useOnce} from "@e280/sly"

import {Basis} from "../../types.js"
import styleCss from "./style.css.js"
import {consts} from "../../../consts.js"
import {themeCss} from "../../utils/theme.js"
import {Game} from "../../../lib/game/game.js"
import {Recruiter} from "../../utils/recruiter.js"
import {Multiframe} from "../../utils/multiframe.js"
import {Perspective} from "../perspective/perspective.js"
import {IntentBucketMap} from "../../../lib/game/utils/intent-bucket-map.js"

export const Play = (basis: Basis, init: (game: Game) => () => void) => shadowElement(() => {
	useCss(themeCss, styleCss)

	const {deck} = basis.deckSetup

	// teeing off the game intent buckets vs meta intent buckets which are sampled at differing rates
	const gamePlayers = useOnce(() => new IntentBucketMap())
	const metaPlayers = useOnce(() => new IntentBucketMap())
	const recruiter = useOnce(() => new Recruiter(deck, [gamePlayers, metaPlayers]))
	useMount(() => effect(() => recruiter.syncWithPorts()))
	useMount(() => recruiter.samplingLoop())

	const game = useOnce(() => new Game(gamePlayers).init())
	useMount(() => init(game))

	useMount(() => cycle(async() => {
		// TODO probably inject intents into the game simulation from here (not from a system fn which is inside-out)
		game.simulate()
		await nap(1000 / consts.simulationHz.max)
	}))

	const multiframe = useOnce(() => new Multiframe(basis, game.entities.readonly))
	useMount(() => effect(() => multiframe.sync(recruiter)))

	return html`
		<div class=shell>
			${multiframe.frames.map($frame => spinner($frame(), Perspective))}
		</div>
	`
})

