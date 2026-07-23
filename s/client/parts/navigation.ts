
import {html} from "lit"
import {Loader} from "@benev/web"
import {effect} from "@e280/strata"
import {hashNav, hashSignal, router} from "@e280/sly"
import {Basis} from "../types.js"
import {RenderZone} from "./render-zone.js"

export function setupNavigation({menu, header, loader, getBasis}: {
		menu: RenderZone
		header: RenderZone
		loader: Loader
		getBasis: () => Promise<Basis>
	}) {

	const $hash = hashSignal()
	const loading = () => "loading..."

	const go = hashNav({
		home: () => ``,
		play: () => `play`,
		editor: () => `editor`,
	})

	let runs = 0

	const route = router({
		"": async() => {
			if (runs === 1) return
			await loader.load(loading, async() => {
				menu.reset()
				header.render(null)
				return Array.from(loader.original.content.cloneNode(true).childNodes)
			}).then(() => header.reset())
		},

		"play": async() => {
			await loader.load(loading, async() => {
				header.render(null)
				const [basis, mod] = await Promise.all([
					getBasis(),
					import("./register-play.js"),
				])
				await mod.default(basis)
				return html`<nano-play></nano-play>`
			})
		},

		"editor": async() => {
			await loader.load(loading, async() => {
				header.render(null)
				const [basis, mod] = await Promise.all([
					getBasis(),
					import("./register-editor.js"),
				])
				await mod.default(basis)
				return html`<nano-editor></nano-editor>`
			})
		},
	})

	effect(() => {
		runs++
		route($hash())
	})

	return {go}
}

