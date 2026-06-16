
export type PlayerId = string

export type Faction = (
	| "neutral"
	| "t1"
	| "t2"
)

export class Art {
	constructor(
		public name: string,
		public faction: Faction | null,
		public preload: number,
	) {}
}

