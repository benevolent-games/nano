
import {Intent} from "@benev/tact"
import {XyArray} from "@benev/math"
import {AsComponents, Id} from "@benev/archimedes"
import {Item, EquipmentAlpha, Equipment, Mech, EquipmentBravo, MechUpper, MechLower} from "./ctypes.js"

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

	/** rotation in radians where this entity is aiming/pointing */
	rotation: number

	/** vector for where the user wants to move */
	wishMove: XyArray

	/** vector for where the user wants to aim */
	wishAim: XyArray

	/** can interact with interactables */
	interactor: boolean

	/** user wants to move faster */
	sprint: boolean

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

	/** description of this robot's build */
	mech: Mech

	/** engine speed */
	engineSpeed: number

	/** angle of rotation for the lower chassis (independent of aim direction) */
	lowerRotation: number

	/** has equipment */
	equipment: Equipment

	/** can store stuff */
	inventory: {
		capacity: number
		items: Item[]
	}

	/** our selection box is targeting these entities */
	target: Id | null

	/** this entity can be targeted */
	targetable: boolean

	/** how far this entity can reach for targeting */
	reach: number

	/** can be picked up */
	pickupable: Item

	/** can be equipped as tool */
	equippable: {
		alpha?: EquipmentAlpha
		bravo?: EquipmentBravo
		mechLower?: MechLower
		mechUpper?: MechUpper
	}

	/** lerp factor for smoothing movements */
	lerp: number

	/** render debug visualizers */
	debug: boolean
}>

