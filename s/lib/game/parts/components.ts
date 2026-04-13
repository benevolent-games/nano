
import {XyArray} from "@benev/math"
import {AsComponents} from "@benev/archimedes"

export type GameComponents = AsComponents<{

	/** section of grid tiles, compactly encoded as a hex string */
	gridchunk: string

	/** centerpoint position in gridspace coordinates */
	position: XyArray

	/** angular rotation in radians, counter clockwise */
	rotation: number

	/** enabled if user inputs should exert influence */
	controllable: boolean

	/** how much oomph this entity has when it tries to move */
	speed: number

	/** direction where the user wants to move */
	intent: XyArray

	/** user wants to move faster */
	sprint: boolean

	/** multiplier on speed when sprint is used */
	sprintFactor: number

	/** where this entity wants to move in units per second */
	velocity: XyArray

	/** which 3d model to display */
	graphic: "robot"

	/** enabled if this entity can bump into things */
	physical: boolean

	/** rectangular extent */
	size: XyArray

	/** how heavy is this entity */
	mass: number

	/** circular size */
	radius: number

	/** lerp factor for smoothing movements */
	lerp: number
}>

