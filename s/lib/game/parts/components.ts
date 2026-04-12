
import {XyArray} from "@benev/math"
import {AsComponents} from "@benev/archimedes"

export type GameComponents = AsComponents<{
	gridchunk: string
	velocity: XyArray
	position: XyArray
	rotation: number
	controllable: boolean
	graphic: "robot"
}>

