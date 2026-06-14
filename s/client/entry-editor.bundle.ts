
import {html} from "lit"
import {dom} from "@e280/sly"
import {Basis} from "./types.js"
import {Editor} from "./views/editor/view.js"
import {EditorMenu} from "./views/editor-menu/view.js"

export default async(basis: Basis) => {
	console.log("editor fn")
	basis.benevMenu.render(html`
		${basis.deckSetup.renderDesk()}
		${EditorMenu()}
	`)
	dom.register({NanoEditor: Editor()}, {soft: true})
}

