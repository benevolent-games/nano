
import {html} from "lit"
import {ShinyButton} from "@e280/shiny"
import {hashNav, hashSignal, router, shadowElement, useCss, useOnce} from "@e280/sly"

import {Play} from "../play/view.js"
import styleCss from "./style.css.js"
import {theme} from "../../utils/theme.js"
import {Gridgen} from "../gridgen/view.js"

export const NanoApp = shadowElement(() => {
	useCss(theme(), styleCss)

	const $hash = useOnce(() => hashSignal())

	const nav = useOnce(() => hashNav({
		"home": () => ``,
		"gridgen": () => `gridgen`,
		"play": () => `play`,
	}))

	const route = useOnce(() => router({
		"": () => html`
			<section class=homeplate>
				<slot></slot>
				<nav>
					${ShinyButton("gridgen", {onClick: nav.gridgen})}
					${ShinyButton("play", {onClick: nav.play, vibe: "happy"})}
				</nav>
			</section>
		`,
		"gridgen": () => Gridgen(),
		"play": () => Play(),
	}))

	return route($hash()) ?? html`<section class=notfound>not found</section>`
})

