
import {archetype} from "../utils/archetype.js"
import {defaultCamSettings} from "../utils/default-cam.js"

export const makeRobot = () => archetype({
	graphic: "robot",
	cam: defaultCamSettings(),
	desire: [0, 0],
	position: [0, 0],
	rotation: 0,
	physical: true,
	size: [0.6, 0.6],
	mass: 1,
	lerp: 0.4,
	velocity: [0, 0],
	speed: 2,
	sprint: false,
	sprintFactor: 2,
	target: null,
	reach: 0.5,
	inventory: {
		capacity: 10,
		items: [],
	},
})

