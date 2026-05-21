
import {degrees} from "@benev/math"
import {MechUpper} from "../parts/ctypes.js"

export const upperScout = (): MechUpper => ({
	name: "upperScout",
	mass: 50,
	inventoryCapacity: 4,
	aimSpeed: degrees(1000),
	alphaCapacity: 1,
	bravoCapacity: 0,
})

export const upperPragmatist = (): MechUpper => ({
	name: "upperPragmatist",
	mass: 200,
	inventoryCapacity: 8,
	aimSpeed: degrees(700),
	alphaCapacity: 2,
	bravoCapacity: 1,
})

export const upperUtilitarian = (): MechUpper => ({
	name: "upperUtilitarian",
	mass: 150,
	inventoryCapacity: 16,
	aimSpeed: degrees(300),
	alphaCapacity: 1,
	bravoCapacity: 2,
})

export const upperChonky = (): MechUpper => ({
	name: "upperChonky",
	mass: 400,
	inventoryCapacity: 4,
	aimSpeed: degrees(200),
	alphaCapacity: 4,
	bravoCapacity: 0,
})

export const upperDapper = (): MechUpper => ({
	name: "upperDapper",
	mass: 200,
	inventoryCapacity: 16,
	aimSpeed: degrees(100),
	alphaCapacity: 1,
	bravoCapacity: 1,
})

