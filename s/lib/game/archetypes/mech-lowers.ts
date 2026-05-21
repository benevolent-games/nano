
import {degrees} from "@benev/math"
import {MechLower} from "../parts/ctypes.js"

export const lowerHover = (): MechLower => ({
	art: "lowerHover",
	mass: 40,
	power: 200,
	sprintFactor: 1.5,
	gasHalftime: 100,
	brakeHalftime: 50,
	turnSpeed: degrees(900),
})

export const lowerTrike = (): MechLower => ({
	art: "lowerTrike",
	mass: 50,
	power: 300,
	sprintFactor: 3,
	gasHalftime: 2000,
	brakeHalftime: 500,
	turnSpeed: degrees(200),
})

export const lowerQuadcar = (): MechLower => ({
	art: "lowerQuadcar",
	mass: 100,
	power: 600,
	sprintFactor: 2,
	gasHalftime: 400,
	brakeHalftime: 200,
	turnSpeed: degrees(600),
})

export const lowerTreads = (): MechLower => ({
	art: "lowerTreads",
	mass: 400,
	power: 1000,
	sprintFactor: 1.5,
	gasHalftime: 1200,
	brakeHalftime: 800,
	turnSpeed: degrees(100),
})

