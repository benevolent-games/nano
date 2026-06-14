
import {html} from "lit"
import {effect} from "@e280/strata"
import {dom, hashSignal} from "@e280/sly"
import {Loader, setupBenev} from "@benev/web"
import {consts} from "../consts.js"
import {load} from "./utils/load.js"
import {Preloader} from "./parts/preloader.js"

const benev = await setupBenev()
dom.register(benev.elements)

const loaderElement = dom("benev-loader")
const loader = new Loader(loaderElement)

const loading = () => "loading..."
const $hash = hashSignal()
let count = 0

const artGlb = new Preloader(consts.assets.art)
const getBasis = async() => ({artGlbUrl: await artGlb.loadObjectUrl()})

effect(() => {
	count++
	const firstRun = (count === 1 && $hash() === "")

	if (firstRun)
		return

	switch ($hash()) {
		case "":
			return loader.load(loading, async() => {
				return Array.from(loader.original.content.cloneNode(true).childNodes)
			})

		case "play":
			return loader.load(loading, async() => {
				const [basis, mod] = await Promise.all([
					getBasis(),
					load(new URL("./entry-play.bundle.min.js", import.meta.url)),
				])
				await mod.default(basis)
				return html`<nano-app></nano-app>`
			})

		case "editor":
			return loader.load(loading, async() => {
				const [basis, mod] = await Promise.all([
					getBasis(),
					load(new URL("./entry-editor.bundle.min.js", import.meta.url)),
				])
				await mod.default(basis)
				return html`<p>editor</p>`
			})
	}
})

