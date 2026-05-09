
import {Intent} from "@benev/tact"
import {XyArray} from "@benev/math"
import {AsComponents, Id} from "@benev/archimedes"

export type GameComponents = AsComponents<{

	/** player user inputs */
	intents: Intent[]

	/** which player entity we're controlled by */
	controlledBy: Id

	/** specifies the total gridworld at play */
	gridworld: {extent: XyArray}

	/** section of grid tiles, compactly encoded as a hex string */
	gridchunk: string

	/** centerpoint position in gridspace coordinates */
	position: XyArray

	/** angular rotation in radians, counter clockwise */
	rotation: number

	/** how much oomph this entity has when it tries to move */
	speed: number

	/** angle in radians that the camera is swiveled */
	swivel: number

	/** direction where the user wants to move */
	desire: XyArray

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

