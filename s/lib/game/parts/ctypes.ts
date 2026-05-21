
export type ItemName =
	| MechLowerArt
	| MechUpperArt
	| EquipmentAlphaName
	| EquipmentBravoName
	| "oreCarbon"
	| "oreColtan"
	| "oreGold"
	| "ingotTantalum"
	| "ingotGold"

export type EquipmentAlphaName =
	| "aCannon"
	| "aDrill"

export type EquipmentBravoName =
	| "bDome"

export type MechLowerArt =
	| "lowerHover"
	| "lowerQuadcar"
	| "lowerTreads"
	| "lowerTrike"

export type MechUpperArt =
	| "upperScout"
	| "upperPragmatist"
	| "upperUtilitarian"
	| "upperChonky"
	| "upperDapper"

export type EquipmentAlpha = {
	name: EquipmentAlphaName
}

export type EquipmentBravo = {
	art: EquipmentBravoName
}

export type MechLower = {
	art: MechLowerArt

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
	art: MechUpperArt

	/** heaviness in kg */
	mass: number

	/** number of inventory slots available */
	inventoryCapacity: number

	/** radians-per-second, max aiming speed capacity */
	aimSpeed: number

	/** how many alphas can be equipped */
	alphaCapacity: number

	/** how many bravos can be equipped */
	bravoCapacity: number
}

