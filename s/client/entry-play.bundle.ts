
import "./renderer/babylon-side-effects.js"
import {dom} from "@e280/sly"
import {Basis} from "./types.js"
import {Play} from "./views/play/view.js"

export default async(basis: Basis) => {
	console.log("play fn")
	dom.register({NanoPlay: Play(basis.deckSetup.deck)}, {soft: true})
}

