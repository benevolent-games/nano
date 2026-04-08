
import {html} from "lit"
import {ShinyButton} from "@e280/shiny"
import {shadowElement, useCss} from "@e280/sly"

import styleCss from "./style.css.js"
import {theme} from "../../utils/theme.js"

export const NanoApp = shadowElement(() => {
	useCss(theme(), styleCss)

	return html`
		<section>
			<slot></slot>
			<nav>
				${ShinyButton("open gridgen")}
				${ShinyButton("play in lab")}
			</nav>
		</section>
	`
})

