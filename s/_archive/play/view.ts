
// import {html} from "lit"
// import {Deck} from "@benev/tact"
// import {effect} from "@e280/strata"
// import {cycle, nap} from "@e280/stz"
// import {shadowElement, spinner, useCss, useMount, useOnce} from "@e280/sly"
//
// import styleCss from "./style.css.js"
// import {consts} from "../../../consts.js"
// import {themeCss} from "../../utils/theme.js"
// import {Game} from "../../../lib/game/game.js"
// import {Multiframe} from "../../utils/multiframe.js"
// import {Perspective} from "./subviews/perspective.js"
// import {ActorMap} from "../../../lib/game/utils/actor.js"
// import {IntentBucketMap, Recruiter} from "./parts/recruiter.js"
//
// export const Play = (deck: Deck) => shadowElement(() => {
// 	useCss(themeCss, styleCss)
//
// 	// teeing off the game intent buckets vs meta intent buckets which are sampled at differing rates
// 	const gamePlayers = useOnce(() => new IntentBucketMap())
// 	const metaPlayers = useOnce(() => new IntentBucketMap())
// 	const recruiter = useOnce(() => new Recruiter(deck, [gamePlayers, metaPlayers]))
// 	useMount(() => effect(() => recruiter.syncWithPorts()))
// 	useMount(() => recruiter.samplingLoop())
//
// 	// special separate 'meta' handling of things like menu buttons
// 	const metaActors = useOnce(() => new ActorMap())
// 	useMount(() => cycle(async() => {
// 		for (const [playerId, intents] of metaPlayers) {
// 			const actions = metaActors.getActor(playerId).resolveActions(intents.take())
// 			if (actions.meta.menu.changedDown) {
// 				console.log("menu!!", playerId)
// 			}
// 		}
// 		await nap(1000 / 120)
// 	}))
//
// 	const game = useOnce(() => new Game(gamePlayers).init())
//
// 	useMount(() => cycle(async() => {
// 		// TODO probably inject intents into the game simulation from here (not from a system fn which is inside-out)
// 		game.simulate()
// 		await nap(1000 / consts.simulationHz.max)
// 	}))
//
// 	const multiframe = useOnce(() => new Multiframe(game.entities.readonly))
// 	useMount(() => effect(() => multiframe.sync(recruiter)))
//
// 	return html`
// 		<div class=shell>
// 			${multiframe.frames.map($frame => spinner($frame(), Perspective))}
// 		</div>
// 	`
// })

