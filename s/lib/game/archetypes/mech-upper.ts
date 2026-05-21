
import {degrees} from "@benev/math"
import {MechUpper} from "../parts/ctypes.js"

export const upperScout = (): MechUpper => ({
	name: "upperScout",
	mass: 50,
	capacity: 4,
	aimSpeed: degrees(1000),
	alphas: 1,
	bravos: 0,
})

export const upperPragmatist = (): MechUpper => ({
	name: "upperPragmatist",
	mass: 200,
	capacity: 8,
	aimSpeed: degrees(700),
	alphas: 2,
	bravos: 1,
})

export const upperUtilitarian = (): MechUpper => ({
	name: "upperUtilitarian",
	mass: 150,
	capacity: 16,
	aimSpeed: degrees(300),
	alphas: 1,
	bravos: 2,
})

export const upperChonky = (): MechUpper => ({
	name: "upperChonky",
	mass: 400,
	capacity: 4,
	aimSpeed: degrees(200),
	alphas: 4,
	bravos: 0,
})

export const upperDapper = (): MechUpper => ({
	name: "upperDapper",
	mass: 200,
	capacity: 16,
	aimSpeed: degrees(100),
	alphas: 1,
	bravos: 1,
})

