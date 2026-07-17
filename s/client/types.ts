
import {Game} from "../lib/game/game.js"
import {setupDeck} from "./parts/setup-deck.js"
import {RenderZone} from "./parts/render-zone.js"

export type GameInit = (game: Game) => () => void

export type Basis = {
	artGlb: ArrayBuffer
	benevMenu: RenderZone
	benevHeader: RenderZone
	deckSetup: ReturnType<typeof setupDeck>
}

