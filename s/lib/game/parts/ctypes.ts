
export type Item =
	| MechLowerName
	| MechUpperName
	| EquipmentA
	| EquipmentB
	| "oreCarbon"
	| "oreColtan"
	| "oreGold"
	| "ingotTantalum"
	| "ingotGold"

export type EquipmentA =
	| "aCannon"
	| "aDrill"

export type EquipmentB =
	| "bDome"

export type Equipment = {
	a: null | EquipmentA
	b: null | EquipmentB
}

export type MechLowerName =
	| "lowerQuadcar"
	| "lowerTreads"
	| "lowerTrike"

export type MechUpperName =
	| "upperScout"
	| "upperPragmatist"
	| "upperUtilitarian"
	| "upperChonky"

export type Mech = {
	lower: MechLower
	upper: MechUpper
}

export type MechLower = {
	name: MechLowerName

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

export type MechUpper = {
	name: MechUpperName

	/** heaviness in kg */
	mass: number

	/** number of inventory slots available */
	capacity: number

	/** radians-per-second, max aiming speed capacity */
	aimSpeed: number
}

