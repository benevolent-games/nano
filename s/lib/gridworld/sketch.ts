
import {count, count2d} from "@e280/stz"
import {Randy, Vec2, makeNoiseSampler} from "@benev/math"

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

export const generateGridworld = (seed: number, extent: Vec2): Gridworld => {
	const grid = initGridworld(extent)
	const randy = new Randy(seed)
	drawSplotchyTileSubstrate(grid, randy)
	connectWaypointsWithFlooring(grid, randy)
	drawBorder(grid, 1, TileKind.Floor)
	return grid
}

export const drawBorder = (
		grid: Gridworld,
		thickness: number,
		kind: TileKind,
	) => {
	const {x: width, y: height} = grid.extent
	setTiles(grid, kind, new Vec2(0, 0), new Vec2(width, thickness))
	setTiles(grid, kind, new Vec2(0, height - thickness), new Vec2(width, thickness))
	setTiles(grid, kind, new Vec2(0, 0), new Vec2(thickness, height))
	setTiles(grid, kind, new Vec2(width - thickness, 0), new Vec2(thickness, height))
}

export const connectWaypointsWithFlooring = (grid: Gridworld, randy: Randy) => {
	const lastX = grid.extent.x - 1
	const lastY = grid.extent.y - 1
	const randomX = () => randy.integerRange(0, lastX)
	const randomY = () => randy.integerRange(0, lastY)
	const north = [new Vec2(randomX(), 0), new Vec2(randomX(), 0)]
	const south = [new Vec2(randomX(), lastY), new Vec2(randomX(), lastY)]
	const east = [new Vec2(lastX, randomY()), new Vec2(lastX, randomY())]
	const west = [new Vec2(0, randomY()), new Vec2(0, randomY())]
	const waypoints = [...north, ...south, ...east, ...west]
	connectAllWaypointsTogetherViaDrunkenFloorWandering({
		grid,
		randy,
		waypoints,
		thickness: 1,
		wobble: 0.4,
	})
}

export const connectAllWaypointsTogetherViaDrunkenFloorWandering = ({
	grid,
	randy,
	waypoints,
	thickness,
	wobble,
}: {
	grid: Gridworld
	randy: Randy
	waypoints: Vec2[]
	thickness: number
	wobble: number
}) => {
	if (waypoints.length < 2)
		return

	const tempVec = Vec2.zero()
	const tempRect = Vec2.zero()
	const lastX = grid.extent.x - 1
	const lastY = grid.extent.y - 1
	const radius = Math.floor(thickness / 2)

	const clampX = (x: number) => Math.max(0, Math.min(lastX, x))
	const clampY = (y: number) => Math.max(0, Math.min(lastY, y))

	const paint = (x: number, y: number) => {
		const startX = clampX(x - radius)
		const startY = clampY(y - radius)
		const endX = clampX(x + radius)
		const endY = clampY(y + radius)

		setTiles(
			grid,
			TileKind.Floor,
			tempVec.set_(startX, startY),
			tempRect.set_(endX - startX + 1, endY - startY + 1),
		)
	}

	for (let i = 0; i < waypoints.length; i++) {
		for (let j = i + 1; j < waypoints.length; j++) {
			const from = waypoints[i]!
			const to = waypoints[j]!

			let x = from.x
			let y = from.y
			paint(x, y)

			let safety = grid.tiles.length * 4

			while ((x !== to.x || y !== to.y) && safety-- > 0) {
				const dx = to.x - x
				const dy = to.y - y

				const goHorizontal = dx !== 0 && (dy === 0 || randy.random() < 0.5)
				const towardX = dx === 0 ? 0 : Math.sign(dx)
				const towardY = dy === 0 ? 0 : Math.sign(dy)

				let stepX = 0
				let stepY = 0

				if (randy.random() < wobble) {
					const options = [
						[1, 0],
						[-1, 0],
						[0, 1],
						[0, -1],
					].filter(([ox, oy]) => {
						const nx = clampX(x + ox)
						const ny = clampY(y + oy)
						return nx !== x || ny !== y
					}) as [number, number][]

					const dir = randy.choose(options)
					stepX = dir[0]
					stepY = dir[1]
				}
				else if (goHorizontal) {
					stepX = towardX
				}
				else {
					stepY = towardY
				}

				x = clampX(x + stepX)
				y = clampY(y + stepY)
				paint(x, y)
			}
		}
	}
}

export const drawSplotchyTileSubstrate = (grid: Gridworld, randy: Randy) => {
	const tempVec = Vec2.zero()
	const noise = makeNoiseSampler(randy.random)
	const z = 1_000_000

	for (const [x, y] of count2d(grid.extent.array())) {
		const duplex = (offset: number, scale1: number, scale2: number) => (
			noise(x + offset, y + offset, scale1) +
			noise(x + (offset * 2), y + (offset * 2), scale2)
		) / 2

		const wallness = duplex(1, 0.01, 0.2)
		const pitness = duplex(z, 0.1, 0.1)

		const tile1 = wallness < 0.5 ? TileKind.Wall : TileKind.Floor
		const tile2 = pitness < 0.25 ? TileKind.Pit : tile1
		setTiles(grid, tile2, tempVec.set_(x, y))
	}
}

