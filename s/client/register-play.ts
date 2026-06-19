
import {dom} from "@e280/sly"

import {Basis} from "./types.js"
import {Game} from "../lib/game/game.js"
import {Play} from "./views/play/view.js"

export default async function(basis: Basis) {
	const init = (game: Game) => {
		// const rand = new Rand(seed(consts.map.seed))
		game.change.create({})
		return () => {}
	}

	dom.register({NanoPlay: Play(basis, init)}, {soft: true})
}

