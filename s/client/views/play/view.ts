
import {html} from "lit"
import {Deck} from "@benev/tact"
import {cycle, nap} from "@e280/stz"
import {shadow, spinner, useCss, useMount, useName, useOnce} from "@e280/sly"

import styleCss from "./style.css.js"
import {consts} from "../../../consts.js"
import {theme} from "../../utils/theme.js"
import {Game} from "../../../lib/game/game.js"
import {Multiframe} from "../../utils/multiframe.js"
import {Perspective} from "./subviews/perspective.js"
import {initialize} from "../../../lib/game/initialize.js"
import {PlayerAssociation} from "./parts/player-association.js"

export const Play = shadow((deck: Deck) => {
	useName("play")
	useCss(theme(), styleCss)

	const playerAssociation = useOnce(() => new PlayerAssociation())

	const game = useOnce(() => {
		const playerAssociation = new PlayerAssociation()
		const game = new Game(() => playerAssociation.consider(deck, Date.now()))
		initialize(game)
		game.entities
		return game
	})

	useMount(() => cycle(async() => {
		game.simulate()
		await nap(1000 / consts.simulationHz.max)
	}))

	console.log("render")
	const multiframe = useOnce(() => new Multiframe(game.entities.readonly))
	const frames = multiframe.sync(playerAssociation)

	return html`
		<div class=shell>
			${frames.map($frame => spinner($frame(), Perspective))}
		</div>
	`
})

