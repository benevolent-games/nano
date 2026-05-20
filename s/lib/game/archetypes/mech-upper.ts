
import {degrees} from "@benev/math"
import {MechUpper} from "../parts/ctypes.js"

export const upperScout = (): MechUpper => ({
	name: "upperScout",
	mass: 50,
	capacity: 4,
	aimSpeed: degrees(1000),
})

export const upperPragmatist = (): MechUpper => ({
	name: "upperPragmatist",
	mass: 200,
	capacity: 8,
	aimSpeed: degrees(700),
})

export const upperUtilitarian = (): MechUpper => ({
	name: "upperUtilitarian",
	mass: 150,
	capacity: 16,
	aimSpeed: degrees(600),
})

export const upperChonky = (): MechUpper => ({
	name: "upperChonky",
	mass: 400,
	capacity: 4,
	aimSpeed: degrees(200),
})

export const upperDapper = (): MechUpper => ({
	name: "upperDapper",
	mass: 200,
	capacity: 16,
	aimSpeed: degrees(100),
})

