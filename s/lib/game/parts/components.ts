
import {XyArray} from "@benev/math"
import {AsComponents} from "@benev/archimedes"

export type GameComponents = AsComponents<{
	gridchunk: string
	position: XyArray
	rotation: number
	controllable: boolean
	speed: number
	force: XyArray
	graphic: "robot"
	physical: boolean
	size: XyArray
	mass: number
	radius: number
	lerp: number
}>

