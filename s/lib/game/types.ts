
export type PlayerId = string

export type Faction = (
	| "neutral"
	| "t1"
	| "t2"
)

export type Variant = "raw" | Faction
export type Variants = Partial<Record<Variant, number>>

export class Art {
	constructor(
		public name: string,
		public variants: Variants,
	) {}
}

