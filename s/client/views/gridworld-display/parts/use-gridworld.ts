
import {Vec2} from "@benev/math"
import {debounce} from "@e280/stz"
import {effect} from "@e280/strata"
import {useMount, useSignal} from "@e280/sly"
import {generateGridworld, Gridworld, initGridworld} from "../../../../lib/gridworld/sketch.js"

export function useGridworld() {
	const $seed = useSignal(1)
	const $x = useSignal(256)
	const $y = useSignal(256)
	const $gridworld = useSignal<Gridworld>(initGridworld(new Vec2(16, 16)))

	const generate = debounce(100, () =>
		$gridworld(
			generateGridworld($seed(), new Vec2($x(), $y()))
		)
	)

	useMount(() => effect(
		() => [$seed(), $x(), $y()],
		generate,
	))

	return {
		$gridworld,
		$seed,
		$x,
		$y,
	}
}

