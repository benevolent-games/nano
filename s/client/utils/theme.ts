
import {is} from "@e280/stz"

export const themeCss = (
	Array.from(document.querySelectorAll<HTMLStyleElement>("style[data-theme]"))
		.map(element => element.sheet)
		.filter(is.happy)
)

