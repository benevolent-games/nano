
export type Item =
	| MechLower
	| MechUpper
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

export type MechLower =
	| "lowerQuadcar"
	| "lowerTreads"
	| "lowerTrike"

export type MechUpper =
	| "upperScout"
	| "upperPragmatist"
	| "upperUtilitarian"
	| "upperChonky"

export type Mech = {
	lower: MechLower
	upper: MechUpper
}

