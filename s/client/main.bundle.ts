
import {once} from "@e280/stz"
import {dom} from "@e280/sly"
import {Loader, setupBenev} from "@benev/web"

import {Basis} from "./types.js"
import {consts} from "../consts.js"
import {load} from "./parts/load.js"
import {setupDeck} from "./parts/setup-deck.js"
import {RenderZone} from "./parts/render-zone.js"
import { setupNavigation } from "./parts/navigation.js"

const benev = await setupBenev()
dom.register(benev.elements)

const benevMenu = new RenderZone(dom("benev-menu"))
const benevHeader = new RenderZone(dom("benev-header"))
const benevLoader = new Loader(dom("benev-loader"))

const deckSetup = setupDeck()
benevMenu.render(deckSetup.renderDesk())

setupNavigation({
	menu: benevMenu,
	header: benevHeader,
	loader: benevLoader,
	getBasis: once(async() => (<Basis>{
		deckSetup,
		benevMenu,
		benevHeader,
		artGlb: await load(consts.assets.art),
	})),
})

