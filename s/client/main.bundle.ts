
import {html} from "lit"
import {effect} from "@e280/strata"
import {dom, hashSignal} from "@e280/sly"
import {Loader, setupBenev} from "@benev/web"
import {Basis} from "./types.js"
import {consts} from "../consts.js"
import {Preloader} from "./parts/preloader.js"
import {setupDeck} from "./parts/setup-deck.js"
import {RenderZone} from "./parts/render-zone.js"

const benev = await setupBenev()
dom.register(benev.elements)

const benevMenu = new RenderZone(dom("benev-menu"))
const benevHeader = new RenderZone(dom("benev-header"))
const benevLoader = new Loader(dom("benev-loader"))

const deckSetup = setupDeck()
benevMenu.render(deckSetup.renderDesk())

const $hash = hashSignal()
const artGlb = new Preloader(consts.assets.art)
const loading = () => "loading..."
const getBasis = async() => (<Basis>{
	artGlbUrl: await artGlb.loadObjectUrl(),
	benevMenu,
	benevHeader,
	deckSetup,
})

let count = 0

effect(() => {
	count++
	const firstRun = (count === 1 && $hash() === "")

	if (firstRun)
		return

	switch ($hash()) {
		case "":
			return benevLoader.load(loading, async() => {
				benevMenu.reset()
				benevHeader.render(null)
				return Array.from(benevLoader.original.content.cloneNode(true).childNodes)
			}).then(() => benevHeader.reset())

		case "play":
			return benevLoader.load(loading, async() => {
				benevHeader.render(null)
				const [basis, mod] = await Promise.all([
					getBasis(),
					import(new URL("./entry-play.bundle.min.js", import.meta.url).href),
				])
				await mod.default(basis)
				return html`<nano-play></nano-play>`
			})

		case "editor":
			return benevLoader.load(loading, async() => {
				benevHeader.render(null)
				const [basis, mod] = await Promise.all([
					getBasis(),
					import(new URL("./entry-editor.bundle.min.js", import.meta.url).href),
				])
				await mod.default(basis)
				return html`<nano-editor></nano-editor>`
			})
	}
})

