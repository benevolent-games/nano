
import {XyArray} from "@benev/math"

export type GameComponents = {
	gridworld: {
		seed: number
		extent: XyArray
	}

	gridchunk: {
		xy: XyArray
		hex: string
	}
}

