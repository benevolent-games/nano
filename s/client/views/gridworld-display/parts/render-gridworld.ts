
import {assert} from "../../../utils/assert.js"
import {Gridworld} from "../../../../lib/gridworld/sketch.js"

export function renderGridworld(gridworld: Gridworld, canvas: HTMLCanvasElement | OffscreenCanvas) {
	const ctx = assert(canvas.getContext("2d"), "failed to get 2d canvas")

	// TODO render the gridworld
}

