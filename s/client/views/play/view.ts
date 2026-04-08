
import {shadow, useCss, useName} from "@e280/sly"
import styleCss from "./style.css.js"
import {theme} from "../../utils/theme.js"
import {useCanvas} from "../../utils/use-canvas.js"

export const Play = shadow(() => {
	useName("play")
	useCss(theme(), styleCss)

	const canvas = useCanvas(() => {})
	return canvas
})

