
import {degrees} from "@benev/math"
import {MechLower, MechUpper} from "./ctypes.js"

export type LowerStats = {

	/** heaviness in kilograms */
	mass: number

	/** engine 'oomph' in kilowatts */
	power: number

	/** lerp factor for achieving max power */
	accel: number

	/** lerp factor for how powerful the brakes are */
	brake: number

	/** continue to roll without input */
	coaster: boolean

	/** radians-per-second, max turn speed capacity */
	turnSpeed: number
}

export type UpperStats = {

	/** heaviness in kg */
	mass: number

	/** number of inventory slots available */
	capacity: number

	/** radians-per-second, max aiming speed capacity */
	aimSpeed: number
}

export const mechStats = {
	lower: {
		lowerTrike: {
			mass: 20,
			power: 10,
			accel: 0.1,
			brake: 6,
			coaster: true,
			turnSpeed: degrees(200),
		},

		lowerQuadcar: {
			mass: 100,
			power: 20,
			accel: 0.2,
			brake: 8,
			coaster: true,
			turnSpeed: degrees(600),
		},

		lowerTreads: {
			mass: 200,
			power: 40,
			accel: 0.1,
			brake: 14,
			coaster: false,
			turnSpeed: degrees(300),
		},
	} satisfies Record<MechLower, LowerStats>,

	upper: {
		upperScout: {
			mass: 50,
			capacity: 4,
			aimSpeed: degrees(1000),
		},

		upperPragmatist: {
			mass: 200,
			capacity: 8,
			aimSpeed: degrees(700),
		},

		upperUtilitarian: {
			mass: 150,
			capacity: 16,
			aimSpeed: degrees(600),
		},

		upperChonky: {
			mass: 400,
			capacity: 4,
			aimSpeed: degrees(200),
		},
	} satisfies Record<MechUpper, UpperStats>,
}

