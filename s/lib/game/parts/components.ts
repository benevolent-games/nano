
import {XyArray} from "@benev/math"
import {AsComponents} from "@benev/archimedes"

export type GameComponents = AsComponents<{
	gridworld: {
		seed: number
		extent: XyArray
	}

	gridchunk: {
		xy: XyArray
		hex: string
	}
}>

