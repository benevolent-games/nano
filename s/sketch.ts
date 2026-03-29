
import {Randy, Vec2} from "@benev/math"
import {count, count2d} from "@e280/stz"

export type Gridworld = {
	extent: Vec2
	tiles: Uint8Array
}

export const initGridworld = (extent: Vec2): Gridworld => ({
	extent,
	tiles: new Uint8Array(extent.x * extent.y),
})

export enum TileKind {
	Pit,
	Floor,
	Wall,
	Coltan,
}

export const index = (extent: Vec2, vec: Vec2) => {
	return (vec.y * extent.x) + vec.x
}

export const getTile = (grid: Gridworld, vec: Vec2) => {
	return grid.tiles.at(index(grid.extent, vec)) as TileKind
}

const one = new Vec2(1, 1)

export const setTiles = (
		grid: Gridworld,
		kind: TileKind,
		vec: Vec2,
		rect = one,
	) => {

	const {extent, tiles} = grid

	const startX = vec.x
	const startY = vec.y
	const endX = startX + rect.x
	const endY = startY + rect.y

	for (let y = startY; y < endY; y++) {
		const row = y * extent.x

		for (let x = startX; x < endX; x++) {
			tiles[row + x] = kind
		}
	}
}

const glyphs = {
	[TileKind.Pit]: "   ",
	[TileKind.Floor]: "░░░",
	[TileKind.Wall]: "███",
	[TileKind.Coltan]: "▓▓▓",
} satisfies Record<TileKind, string>

const possibleKinds = [
	TileKind.Pit,
	TileKind.Floor,
	TileKind.Wall,
	TileKind.Coltan,
]

export const generateGridworld = (extent: Vec2): Gridworld => {
	const grid = initGridworld(extent)
	const randy = new Randy()
	const tempVec = Vec2.zero()

	for (const [x, y] of count2d(extent.toJSON())) {
		const kind = randy.choose(possibleKinds)
		setTiles(grid, kind, tempVec.set_(x, y))
	}

	return grid
}

export const renderGridworld = (grid: Gridworld) => {
	const lines: string[] = []
	const {extent, tiles} = grid
	const tempVec = new Vec2(0, 0)

	for (const y of count(extent.y)) {
		const line: string[] = []

		for (const x of count(extent.x)) {
			const i = index(extent, tempVec.set_(x, y))
			const kind = tiles[i] as TileKind
			line.push(glyphs[kind])
		}

		lines.push(line.join(""))
	}

	return lines.join("\n")
}

