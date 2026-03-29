
import {html} from "lit"
import {Signal} from "@e280/strata"
import {shadow, useCss, useName, useEffect, useSignal} from "@e280/sly"
import {theme} from "../../utils/theme.js"
import stylesCss from "./styles.css.js"
import {useCanvas} from "../../utils/use-canvas.js"
import {useGridworld} from "./parts/use-gridworld.js"
import {renderGridworld} from "./parts/render-gridworld.js"

export const GridworldDisplay = shadow(() => {
	useName("gridworld-display")
	useCss(theme(), stylesCss)

	const {$gridworld, $generationMs, $seed, $x, $y} = useGridworld()
	const $renderMs = useSignal(0)
	const render = () => $renderMs(renderGridworld($gridworld(), canvas))

	const canvas = useCanvas(render)
	useEffect(render)

	const updateNumber = ($signal: Signal<number>) => (e: Event) => $signal(
		Number((e.currentTarget as HTMLInputElement).value)
	)

	return html`
		<header class=controls>
			<label>
				<span>seed</span>
				<input type=number step=1 value="${$seed()}" @input="${updateNumber($seed)}"/>
			</label>

			<label>
				<span>x</span>
				<input type=number step=64 min="8" value="${$x()}" @input="${updateNumber($x)}"/>
			</label>

			<label>
				<span>y</span>
				<input type=number step=64 min="8" value="${$y()}" @input="${updateNumber($y)}"/>
			</label>

			<output class=metrics>
				gen ${Math.round($generationMs())}ms, render ${Math.round($renderMs())}ms
			</output>
		</header>

		${canvas}
	`
})

