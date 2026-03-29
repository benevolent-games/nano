import {count2d} from "@e280/stz"
import {Vec2} from "@benev/math"
import {Gridworld, TileKind} from "../types.js"

export const initGridworld = (extent: Vec2): Gridworld => ({
	extent,
	tiles: new Uint8Array(extent.x * extent.y),
})

export const index = (extent: Vec2, vec: Vec2) => {
	return (vec.y * extent.x) + vec.x
}

export const inBounds = (grid: Gridworld, {x, y}: Vec2) => {
	return x >= 0 && y >= 0 && x < grid.extent.x && y < grid.extent.y
}

export const clampPointToGrid = (grid: Gridworld, point: Vec2) => {
	return point.clamp(
		Vec2.zero(),
		grid.extent.dup().subBy(1),
	)
}

export const getTile = (grid: Gridworld, vec: Vec2) => {
	return grid.tiles[index(grid.extent, vec)] as TileKind
}

export const setTile = (grid: Gridworld, kind: TileKind, vec: Vec2) => {
	if (!inBounds(grid, vec))
		return

	grid.tiles[index(grid.extent, vec)] = kind
}

export const paintRect = (
	grid: Gridworld,
	kind: TileKind,
	start: Vec2,
	size: Vec2,
) => {
	const min = clampPointToGrid(grid, start.dup())
	const max = clampPointToGrid(grid, start.dup().add(size).subBy(1))

	for (let y = min.y; y <= max.y; y++) {
		const row = y * grid.extent.x
		for (let x = min.x; x <= max.x; x++)
			grid.tiles[row + x] = kind
	}
}

export const paintSquareBrush = (
	grid: Gridworld,
	kind: TileKind,
	center: Vec2,
	thickness: number,
) => {
	const radius = Math.max(0, Math.floor((thickness - 1) / 2))
	paintRect(
		grid,
		kind,
		center.dup().sub_(radius, radius),
		new Vec2((radius * 2) + 1, (radius * 2) + 1),
	)
}

export const forEachCell = (
	grid: Gridworld,
	fn: (point: Vec2, current: TileKind) => void,
) => {
	const point = Vec2.zero()

	for (const [x, y] of count2d(grid.extent.array())) {
		point.set_(x, y)
		fn(point, grid.tiles[index(grid.extent, point)] as TileKind)
	}
}
