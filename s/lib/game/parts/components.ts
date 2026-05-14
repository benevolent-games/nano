
import {Intent} from "@benev/tact"
import {XyArray} from "@benev/math"
import {AsComponents, Id} from "@benev/archimedes"
import {ItemKind, ToolKind, Tools} from "./ctypes.js"

export type GameComponents = AsComponents<{

	/** player user inputs */
	intents: Intent[]

	/** specifies the total gridworld at play */
	gridworld: {extent: XyArray}

	/** section of grid tiles, compactly encoded as a hex string */
	gridchunk: string

	/** which player entity we're controlled by */
	controlledBy: Id

	/** camera settings */
	cam: {
		focal: XyArray
		zoom: number
		tilt: number
		swivel: number
		fov: number
		lerp: number
	}

	/** centerpoint position in gridspace coordinates */
	position: XyArray

	/** angular rotation in radians, counter clockwise */
	rotation: number

	/** how much oomph this entity has when it tries to move */
	speed: number

	/** direction where the user wants to move */
	desire: XyArray

	/** can interact with interactables */
	interactor: boolean

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

	/** can equip tools */
	tools: Tools

	/** can store stuff */
	inventory: {
		capacity: number
		items: ItemKind[]
	}

	/** our selection box is targeting these entities */
	target: Id | null

	/** this entity can be targeted */
	targetable: boolean

	/** how far this entity can reach for targeting */
	reach: number

	/** can be picked up */
	pickupable: ItemKind

	/** can be equipped as tool */
	equippable: ToolKind

	/** lerp factor for smoothing movements */
	lerp: number

	/** render debug visualizers */
	debug: boolean
}>

