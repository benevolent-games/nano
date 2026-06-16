
import {Intent} from "@benev/tact"
import {XyArray} from "@benev/math"
import {art} from "../art.js"
import {AsComponents, Id} from "@benev/archimedes"
import {MechUpper, MechLower, EquipmentAlpha, EquipmentBravo} from "./ctypes.js"

export type GameComponents = AsComponents<{

	/** render debug visualizers */
	debug: true

	/** which 3d model to display */
	art: keyof typeof art

	/** total scaling of the art */
	scale: number

	/** specifies the total gridworld at play */
	gridworld: {extent: XyArray}

	/** section of grid tiles, compactly encoded as a hex string */
	gridchunk: string

	/** which player entity we're controlled by */
	controlledBy: Id

	/** player user inputs */
	intents: Intent[]

	/** how a player wants to move in the world */
	wishMover: {
		move: XyArray
		aim: XyArray
		sprint: boolean
	}

	/** how a user wants to interact with things */
	wishInteractor: {
		pickup: boolean
		drop: boolean
		use: boolean
		unequip: boolean
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
	pickupable: true

	/** this entity can be targeted by other entities */
	targetable: true

	/** we can target another entity for various reasons */
	target: Id | null

	/** currently inside an inventory */
	containerId: Id

	/** how far this entity can reach for targeting */
	reach: number

	/** this item is currently equipped */
	equipped: true

	/** this is an equippable mech lower */
	mechLower: MechLower

	/** this is an equippable mech upper */
	mechUpper: MechUpper

	/** this is an equippable weapon */
	equipmentAlpha: EquipmentAlpha

	/** this is an equippable utility */
	equipmentBravo: EquipmentBravo

	/** this is an passive attachment */
	equipmentCharlie: EquipmentBravo

	/** we're a mech */
	mech: {

		/** current engine speed */
		rpm: number

		/** angle of rotation for the lower chassis (independent of aim direction) */
		chassisRotation: number
	}

	/** details of the entities that compose this mech */
	mechBuild: {
		lowerId: Id
		upperId: Id
		alphaIds: Id[]
		bravoIds: Id[]
		charlieIds: Id[]
	}
}>

