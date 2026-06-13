
import {html} from "lit"
import {effect} from "@e280/strata"
import {dom, hashSignal} from "@e280/sly"
import {Loader, setupBenev} from "@benev/web"
import {load} from "./utils/load.js"

const benev = await setupBenev()
dom.register(benev.elements)

const loaderElement = dom("benev-loader")
const loader = new Loader(loaderElement)

const loading = () => "loading..."
const $hash = hashSignal()
let count = 0

effect(() => {
	count++

	if (count === 1 && $hash() === "")
		return

	switch ($hash()) {
		case "": {
			loader.load(loading, async() => {
				await load(new URL("./game.bundle.min.js", import.meta.url))
				return Array.from(loader.original.content.cloneNode(true).childNodes)
			})
			break
		}

		case "play": {
			loader.load(loading, async() => {
				await load(new URL("./game.bundle.min.js", import.meta.url))
				return html`<nano-app></nano-app>`
			})
			break
		}

		case "editor": {
			loader.load(loading, async() => {
				await load(new URL("./editor.bundle.min.js", import.meta.url))
				return html`<p>editor</p>`
			})
			break
		}
	}
})

