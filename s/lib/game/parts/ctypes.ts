
export type EquipmentKind =
	| "e-cannon"
	| "e-drill"
	| "e-dome"

export type ItemKind =
	| EquipmentKind
	| "ore-carbon"
	| "ore-coltan"
	| "ore-gold"
	| "ingot-tantalum"
	| "ingot-gold"
	| "lower-quadcar"
	| "lower-treads"
	| "lower-trike"
	| "upper-scout"
	| "upper-pragmatist"
	| "upper-utilitarian"
	| "upper-chonky"

export type Equipment = {
	a: null | EquipmentKind
	b: null | EquipmentKind
}

