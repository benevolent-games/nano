
export type Item =
	| MechLower
	| MechUpper
	| EquipmentA
	| EquipmentB
	| "ore-carbon"
	| "ore-coltan"
	| "ore-gold"
	| "ingot-tantalum"
	| "ingot-gold"

export type EquipmentA =
	| "a-cannon"
	| "a-drill"

export type EquipmentB =
	| "b-dome"

export type Equipment = {
	a: null | EquipmentA
	b: null | EquipmentB
}

export type MechLower =
	| "lower-quadcar"
	| "lower-treads"
	| "lower-trike"

export type MechUpper =
	| "upper-scout"
	| "upper-pragmatist"
	| "upper-utilitarian"
	| "upper-chonky"

export type Mech = {
	lower: MechLower
	upper: MechUpper
}

