
import {html} from "lit"
import {shadow, useSignal} from "@e280/sly"

export const Mapper = shadow(() => {
	const $seed = useSignal(1)
	const add = (x: number) => () => $seed.value += x

	return html`
		<button @click="${add(-1)}">&lt;</button>
		<span>${$seed()}</span>
		<button @click="${add(1)}">&gt;</button>
	`
})

