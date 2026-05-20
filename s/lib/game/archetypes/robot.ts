
import {upperScout} from "./mech-upper.js"
import {lowerTrike} from "./mech-lowers.js"
import {archetype} from "../utils/archetype.js"
import {defaultCamSettings} from "../utils/default-cam.js"

export const makeRobot = () => archetype({
	graphic: "robot",
	cam: defaultCamSettings(),
	wishMove: [0, 0],
	wishAim: 0,
	position: [0, 0],
	rotation: 0,
	physical: true,
	size: [0.6, 0.6],
	mass: 1,
	lerp: 0.4,
	velocity: [0, 0],
	sprint: false,
	target: null,
	reach: 1,
	inventory: {
		capacity: 25,
		items: [],
	},
	mech: {
		lower: lowerTrike(),
		upper: upperScout(),
	},
	engineSpeed: 0,
	equipped: {
		a: null,
		b: null,
	},
})

