
import {html} from "lit"
import {dom} from "@e280/sly"

import {Basis} from "./types.js"
import {Game} from "../lib/game/game.js"
import {Play} from "./views/play/view.js"
import {EditorMenu} from "./views/editor-menu/view.js"

export default async function(basis: Basis) {
	basis.benevMenu.render(html`
		${basis.deckSetup.renderDesk()}
		${EditorMenu()}
	`)

	const init = (game: Game) => {
		// const rand = new Rand(seed(consts.map.seed))
		game.change.create({})
		return () => {}
	}

	dom.register({NanoEditor: Play(basis, init)}, {soft: true})
}

