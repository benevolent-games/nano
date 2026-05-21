
import {Intent} from "@benev/tact"
import {XyArray} from "@benev/math"
import {AsComponents, Id} from "@benev/archimedes"
import {MechUpper, MechLower, EquipmentAlpha, EquipmentBravo} from "./ctypes.js"

export type GameComponents = AsComponents<{

	/** render debug visualizers */
	debug: true

	/** specifies the total gridworld at play */
	gridworld: {extent: XyArray}

	/** section of grid tiles, compactly encoded as a hex string */
	gridchunk: string

	/** parent that owns this entity */
	ownerId: Id

	/** which player entity we're controlled by */
	controlledBy: Id

	/** player user inputs */
	intents: Intent[]

	/** how a player wants to move in the world */
	wishMover: {
		move: XyArray
		aim: XyArray
	}

	/** how a user wants to interact with things */
	wishInteractor: {
		use: boolean
		sprint: boolean
		pickup: boolean
		drop: boolean
	}

	/** how a user wants to fire their weapons */
	wishActions: {
		a1: boolean
		a2: boolean
		a3: boolean
		a4: boolean
	}

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

	/** rectangular extent */
	size: XyArray

	/** actual movement right now */
	velocity: XyArray

	/** which 3d model to display */
	art: string

	/** enabled if this entity can bump into things */
	physical: boolean

	/** how heavy is this entity */
	mass: number

	/** lerp factor for smoothing movements (for high-framerate rendering) */
	lerp: number

	/** how many items this entity can store */
	inventoryCapacity: number

	/** we're currently carrying these entities */
	inventory: Id[]

	/** can be picked up and dropped as an inventory item */
	inventoryItem: true

	/** we can target another entity for various reasons */
	target: Id | null

	/** this entity can be targeted by other entities */
	targetable: boolean

	/** how far this entity can reach for targeting */
	reach: number

	/** this is an equippable mech lower */
	mechLower: MechLower

	/** this is an equippable mech upper */
	mechUpper: MechUpper

	/** this is an equippable weapon */
	equipmentAlpha: EquipmentAlpha

	/** this is an equippable utility */
	equipmentBravo: EquipmentBravo

	/** we're a mech */
	mech: {

		/** current engine speed */
		rpm: number

		/** angle of rotation for the lower chassis (independent of aim direction) */
		chassisRotation: number
	}

	/** details of the entities that compose this mech */
	mechBuild: {
		lower: Id
		upper: Id
		alphas: Id[]
		bravos: Id[]
	}
}>

