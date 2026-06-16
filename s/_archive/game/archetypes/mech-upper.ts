
import {degrees} from "@benev/math"
import {MechUpper} from "../parts/ctypes.js"

export const upperScout = (): MechUpper => ({
	art: "upperScout",
	mass: 50,
	inventoryCapacity: 4,
	aimSpeed: degrees(1000),
	alphaCapacity: 1,
	bravoCapacity: 0,
})

export const upperPragmatist = (): MechUpper => ({
	art: "upperPragmatist",
	mass: 200,
	inventoryCapacity: 8,
	aimSpeed: degrees(700),
	alphaCapacity: 2,
	bravoCapacity: 1,
})

export const upperUtilitarian = (): MechUpper => ({
	art: "upperUtilitarian",
	mass: 150,
	inventoryCapacity: 16,
	aimSpeed: degrees(300),
	alphaCapacity: 1,
	bravoCapacity: 2,
})

export const upperChonky = (): MechUpper => ({
	art: "upperChonky",
	mass: 400,
	inventoryCapacity: 4,
	aimSpeed: degrees(200),
	alphaCapacity: 4,
	bravoCapacity: 0,
})

export const upperDapper = (): MechUpper => ({
	art: "upperDapper",
	mass: 200,
	inventoryCapacity: 16,
	aimSpeed: degrees(100),
	alphaCapacity: 1,
	bravoCapacity: 1,
})

