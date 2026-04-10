
import {XyArray} from "@benev/math"
import {AsComponents} from "@benev/archimedes"

export type GameComponents = AsComponents<{
	ready: boolean

	gridworld: {
		seed: number
		extent: XyArray
	}

	gridchunk: {
		xy: XyArray
		hex: string
	}
}>

