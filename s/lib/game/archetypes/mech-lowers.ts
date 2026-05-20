
import {degrees} from "@benev/math"
import {MechLower} from "../parts/ctypes.js"

export const lowerTrike = (): MechLower => ({
	name: "lowerTrike",
	mass: 20,
	power: 200,
	sprintFactor: 2,
	gasHalftime: 1000,
	brakeHalftime: 200,
	turnSpeed: degrees(200),
})

export const lowerQuadcar = (): MechLower => ({
	name: "lowerQuadcar",
	mass: 100,
	power: 600,
	sprintFactor: 2,
	gasHalftime: 400,
	brakeHalftime: 200,
	turnSpeed: degrees(600),
})

export const lowerTreads = (): MechLower => ({
	name: "lowerTreads",
	mass: 400,
	power: 1000,
	sprintFactor: 1.5,
	gasHalftime: 1200,
	brakeHalftime: 800,
	turnSpeed: degrees(100),
})

