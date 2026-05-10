
import {archetype} from "../utils/archetype.js"
import {defaultCamSettings} from "../utils/default-cam.js"

export const makeRobot = () => archetype({
	graphic: "robot",
	cam: defaultCamSettings(),
	desire: [0, 0],
	position: [0, 0],
	rotation: 0,
	physical: true,
	radius: 0.30,
	mass: 1,
	lerp: 0.4,
	velocity: [0, 0],
	speed: 2,
	sprint: false,
	sprintFactor: 2,
})

