
import {degrees} from "@benev/math"
import {archetype} from "../utils/archetype.js"

export const makeRobot = () => archetype({
	graphic: "robot",
	swivel: degrees(45),
	desire: [0, 0],
	position: [0, 0],
	rotation: 0,
	physical: true,
	radius: 0.40,
	mass: 1,
	lerp: 0.4,
	velocity: [0, 0],
	speed: 4,
	sprint: false,
	sprintFactor: 2,
})

