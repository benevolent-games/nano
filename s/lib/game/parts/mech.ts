
import {degrees} from "@benev/math"
import {MechLower, MechUpper} from "./ctypes.js"

export type LowerStats = {

	/** heaviness in kilograms */
	mass: number

	/** engine 'oomph' in kilowatts */
	power: number

	/** power multiplier */
	sprintFactor: number

	/** halflife factor for achieving max power */
	gasHalftime: number

	/** halflife factor for how powerful the brakes are */
	brakeHalftime: number

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
			power: 200,
			sprintFactor: 2,
			gasHalftime: 1000,
			brakeHalftime: 200,
			turnSpeed: degrees(200),
		},

		lowerQuadcar: {
			mass: 100,
			power: 600,
			sprintFactor: 2,
			gasHalftime: 400,
			brakeHalftime: 200,
			turnSpeed: degrees(600),
		},

		lowerTreads: {
			mass: 400,
			power: 1000,
			sprintFactor: 1.5,
			gasHalftime: 1200,
			brakeHalftime: 800,
			turnSpeed: degrees(100),
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

