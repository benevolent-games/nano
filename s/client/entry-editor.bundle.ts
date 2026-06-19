
import {html} from "lit"
import {dom} from "@e280/sly"
import {Rand, seed} from "@e280/stz"

import {Basis} from "./types.js"
import {consts} from "../consts.js"
import {Game} from "../lib/game/game.js"
import {Play} from "./views/play/view.js"
import {EditorMenu} from "./views/editor-menu/view.js"

export default async(basis: Basis) => {
	const {deck} = basis.deckSetup

	basis.benevMenu.render(html`
		${basis.deckSetup.renderDesk()}
		${EditorMenu()}
	`)

	const init = (game: Game) => {
		const rand = new Rand(seed(consts.map.seed))
		game.change.create({})
		return () => {}
	}

	dom.register({NanoEditor: Play(deck, init)}, {soft: true})
}

