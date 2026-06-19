
import {dom} from "@e280/sly"
import {Rand, seed} from "@e280/stz"

import {Basis} from "./types.js"
import {consts} from "../consts.js"
import {Game} from "../lib/game/game.js"
import {Play} from "./views/play/view.js"

export default async(basis: Basis) => {
	console.log("play fn")

	const init = (game: Game) => {
		const rand = new Rand(seed(consts.map.seed))
		game.change.create({})
		return () => {}
	}

	dom.register({NanoPlay: Play(basis.deckSetup.deck, init)}, {soft: true})
}

