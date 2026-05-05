
import {Vec2} from "@benev/math"
import {debounce} from "@e280/stz"
import {Signal} from "@e280/strata"
import {useEffect, useSignal} from "@e280/sly"
import {generateGridworld} from "../../../../lib/gridworld/generate.js"

export function useGridworld() {
	const $seed: Signal<number> = useSignal(1)
	const $x = useSignal(256)
	const $y = useSignal(256)

	const $gridworld = useSignal(generateGridworld($seed(), new Vec2($x(), $y())))
	const $generationMs = useSignal(0)

	const generate = debounce(200, () => {
		const start = performance.now()
		const gridworld = generateGridworld($seed(), new Vec2($x(), $y()))
		$gridworld(gridworld)
		$generationMs(performance.now() - start)
	})

	useEffect(() => {
		void $seed()
		void $x()
		void $y()
		generate()
	})

	return {
		$gridworld,
		$generationMs,
		$seed,
		$x,
		$y,
	}
}

