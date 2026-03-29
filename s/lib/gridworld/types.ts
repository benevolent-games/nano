
import {Vec2} from "@benev/math"

export type Gridworld = {
	extent: Vec2
	tiles: Uint8Array
}

export enum TileKind {
	Pit,
	Floor,
	Wall,
	Coltan,
}

