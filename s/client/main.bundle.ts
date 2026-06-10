
import {html} from "lit"
import {dom} from "@e280/sly"
import {Loader, setupBenev} from "@benev/web"

const benev = await setupBenev()
dom.register(benev.elements)

const loader = new Loader(dom("benev-loader"))

dom("#play-button").onclick = async() => {
	await loader.load(
		() => "loading...",
		async() => {
			const src = new URL("./game.bundle.min.js", import.meta.url)
			await import(src.href)
			return html`<nano-app></nano-app>`
		},
	)
}

