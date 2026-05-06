
import {html} from "lit"
import {Deck} from "@benev/tact"
import {effect} from "@e280/strata"
import {cycle, nap} from "@e280/stz"
import {shadow, spinner, useCss, useMount, useName, useOnce} from "@e280/sly"

import styleCss from "./style.css.js"
import {consts} from "../../../consts.js"
import {theme} from "../../utils/theme.js"
import {Game} from "../../../lib/game/game.js"
import {Multiframe} from "../../utils/multiframe.js"
import {Perspective} from "./subviews/perspective.js"
import {initialize} from "../../../lib/game/initialize.js"
import {Players} from "./parts/players.js"

export const Play = shadow((deck: Deck) => {
	useName("play")
	useCss(theme(), styleCss)

	const players = useOnce(() => new Players(deck))
	useMount(() => effect(() => players.update()))

	const game = useOnce(() => {
		const game = new Game(() => players.resolveIntents(Date.now()))
		initialize(game)
		game.entities
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

