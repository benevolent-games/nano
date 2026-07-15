
import {setupDeck} from "./parts/setup-deck.js"
import {RenderZone} from "./parts/render-zone.js"

export type Basis = {
	artGlb: ArrayBuffer
	benevMenu: RenderZone
	benevHeader: RenderZone
	deckSetup: ReturnType<typeof setupDeck>
}

