
import {html} from "lit"
import {shadowElement, useCss} from "@e280/sly"
import styleCss from "./style.css.js"
import {themeCss} from "../../utils/theme.js"

export const Editor = () => shadowElement(() => {
	useCss(themeCss, styleCss)

	return html`
		<p>editor</p>
	`
})

