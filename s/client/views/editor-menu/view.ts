
import {html} from "lit"
import {shadow, useCss, useName} from "@e280/sly"
import {themeCss} from "../../utils/theme.js"
import styleCss from "./style.css.js"

export const EditorMenu = shadow(() => {
	useName("editor-menu")
	useCss(themeCss, styleCss)

	return html`
		<input type="file"/>
		<button benev-button>save</button>
	`
})

