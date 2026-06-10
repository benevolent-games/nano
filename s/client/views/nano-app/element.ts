
import {html} from "lit"
import {DeskView} from "@benev/tact/ui"
import {ShinyButton} from "@e280/shiny"
import {dom, hashNav, hashSignal, router, shadowElement, useCss, useOnce} from "@e280/sly"

import {Play} from "../play/view.js"
import styleCss from "./style.css.js"
import {Gridgen} from "../gridgen/view.js"
import {themeCss} from "../../utils/theme.js"
import {setupDeck} from "../../parts/setup-deck.js"

export const NanoApp = shadowElement(() => {
	useCss(themeCss, styleCss)

	const $hash = useOnce(() => hashSignal())
	const {deck, getControllerLabel} = useOnce(() => setupDeck())

	const header = useOnce(() => dom("benev-header"))
	header.toggleAttribute("hide-links", $hash() !== "")

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

				${DeskView(deck, {getControllerLabel})}
			</section>
		`,
		"gridgen": () => Gridgen(),
		"play": () => Play(deck),
	}))

	return route($hash()) ?? html`
		<section class=notfound>
			not found
		</section>
	`
})

