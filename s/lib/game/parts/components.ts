
import {Intent} from "@benev/tact"
import {XyArray} from "@benev/math"
import {AsComponents, Id} from "@benev/archimedes"

import {Equipment} from "./ctypes.js"
import {manifest} from "../art.js"

export type GameComponents = AsComponents<{

	/** render debug visualizers */
	debug: true

	/** which 3d model to display */
	art: keyof typeof manifest

	/** total scaling of the art */
	scale: number

	/** centerpoint position in gridspace coordinates */
	position: XyArray

	/** rotation in radians where this entity is aiming/pointing */
	rotation: number

	/** rectangular extent */
	size: XyArray

	/** which player entity we're controlled by */
	controlledBy: Id

	/** player user inputs */
	intents: Intent[]

	/** how a user wants to move in the world */
	wishMover: {
		move: XyArray
		aim: XyArray
		boost: boolean
	}

	/** how a user wants to interact with things */
	wishInteractor: {
		use: boolean
	}

	/** how a user wants to fire their weapons */
	wishActions: {
		a1: boolean
		a2: boolean
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

	/** actual movement right now */
	velocity: XyArray

	/** enabled if this entity can bump into things */
	physical: boolean

	/** how heavy is this entity */
	mass: number

	/** this entity can be targeted by other entities */
	targetable: true

	/** we can target another entity for various reasons */
	target: Id | null

	/** how far this entity can reach for targeting */
	reach: number

	/** what equipment using this provides */
	equipment: Equipment

	/** what is currently equipped */
	equipped: Equipment

	/** wheels and engine for powering vehicle locomotion */
	vehicle: {

		/** current engine speed */
		rpm: number

		/** angle of rotation for the lower chassis (independent of aim direction) */
		chassisRotation: number
	}
}>

