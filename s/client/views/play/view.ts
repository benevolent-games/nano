
import {html} from "lit"
import {keyed} from "lit/directives/keyed.js"
import {repeat} from "lit/directives/repeat.js"
import {loot, shadowElement, useCss, useOnce, useSignal} from "@e280/sly"

import styleCss from "./style.css.js"
import {useGame} from "./use/use-game.js"
import {themeCss} from "../../utils/theme.js"
import {Basis, GameInit} from "../../types.js"
import { Viewport } from "./sub/viewport.js"

export const Play = (basis: Basis, init: GameInit) => shadowElement(() => {
	useCss(themeCss, styleCss)

	const {deck} = basis.deckSetup
	const {game, recruiter} = useGame(deck, init)
	const $artGlb = useSignal(basis.artGlb)

	const drops = useOnce(() => new loot.Drops({
		predicate: loot.hasFiles,
		acceptDrop: async event => {
			const [file] = loot.files(event)
			const buffer = await file.arrayBuffer()
			$artGlb(buffer)
		},
	}))

	return html`
		<div
			class=shell
			?data-drop=${drops.$indicator()}
			@dragover=${drops.dragover}
			@dragleave=${drops.dragleave}
			@drop=${drops.drop}>

			${keyed($artGlb(), repeat(
				recruiter.listPlayers(),
				playerId => playerId,
				playerId => Viewport($artGlb(), playerId, game.entities.readonly),
			))}
		</div>
	`
})

