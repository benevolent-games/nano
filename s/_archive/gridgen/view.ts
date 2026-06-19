
import {html} from "lit"
import {Signal} from "@e280/strata"
import {shadow, useCss, useName, useEffect, useSignal, useOnce} from "@e280/sly"
import styleCss from "./style.css.js"
import {themeCss} from "../../client/utils/theme.js"
import {useGridworld} from "./parts/use-gridworld.js"
import {renderGridworld} from "./parts/render-gridworld.js"
import {useResizeObserver} from "../../client/utils/use-resize-observer.js"

export const Gridgen = shadow(() => {
	useName("gridgen")
	useCss(themeCss, styleCss)

	const {$gridworld, $generationMs, $seed, $x, $y} = useGridworld()
	const $renderMs = useSignal(0)

	const canvas = useOnce(() => document.createElement("canvas"))
	const render = () => $renderMs(renderGridworld($gridworld(), canvas))

	useResizeObserver(canvas, rect => {
		canvas.width = rect.width
		canvas.height = rect.height
		render()
	})

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
				<input type=number step=64 min="0" max="2048" value="${$x()}" @input="${updateNumber($x)}"/>
			</label>

			<label>
				<span>y</span>
				<input type=number step=64 min="0" max="2048" value="${$y()}" @input="${updateNumber($y)}"/>
			</label>

			<output class=metrics>
				gen ${Math.round($generationMs())}ms, render ${Math.round($renderMs())}ms
			</output>
		</header>

		${canvas}
	`
})

