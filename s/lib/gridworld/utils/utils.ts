
import {count, count2d} from "@e280/stz"
import {makeNoiseSampler, Randy, Vec2} from "@benev/math"
import {Gridworld, TileKind} from "../types.js"

export const initGridworld = (extent: Vec2): Gridworld => ({
	extent,
	tiles: new Uint8Array(extent.x * extent.y),
})

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
	const horizontalCount = Math.ceil(grid.extent.x / 64)
	const verticalCount = Math.ceil(grid.extent.y / 64)
	const lastX = grid.extent.x - 1
	const lastY = grid.extent.y - 1
	const randomX = () => randy.integerRange(0, lastX)
	const randomY = () => randy.integerRange(0, lastY)
	const north = [...count(horizontalCount)].map(() => new Vec2(randomX(), 0))
	const south = [...count(horizontalCount)].map(() => new Vec2(randomX(), lastY))
	const east = [...count(verticalCount)].map(() => new Vec2(lastX, randomY()))
	const west = [...count(verticalCount)].map(() => new Vec2(0, randomY()))
	const mid = grid.extent.dup().half().floor()
	const waypoints = [...north, ...south, ...east, ...west]
	const thickness = ((grid.extent.x * grid.extent.y) >= 128 ** 2)
		? 2
		: 1

	for (const waypoint of waypoints) {
		connectWaypointPairViaDrunkenFloorWandering({
			grid,
			randy,
			from: waypoint,
			to: mid,
			wobble: 0.4,
			thickness,
		})
	}
}

export const connectWaypointPairViaDrunkenFloorWandering = ({
	grid,
	randy,
	from,
	to,
	thickness,
	wobble,
}: {
	grid: Gridworld
	randy: Randy
	from: Vec2
	to: Vec2
	thickness: number
	wobble: number
}) => {
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

	let x = from.x
	let y = from.y
	const startDistance = Math.max(1, Math.hypot(to.x - from.x, to.y - from.y))
	let headingBias = (randy.random() - 0.5) * Math.PI * 1.4
	paint(x, y)

	let safety = grid.tiles.length * 4

	while ((x !== to.x || y !== to.y) && safety-- > 0) {
		const dx = to.x - x
		const dy = to.y - y
		const distance = Math.hypot(dx, dy)
		const closeness = 1 - Math.min(1, distance / startDistance)
		const biasStrength = 1 - (closeness ** 3.2)
		const targetHeading = Math.atan2(dy, dx)
		const drift = (randy.random() - 0.5) * wobble * 1.9
		headingBias += drift
		headingBias *= 0.975
		headingBias = Math.atan2(Math.sin(headingBias), Math.cos(headingBias))
		const heading = targetHeading + (headingBias * biasStrength)

		const options = [
			[-1, -1], [0, -1], [1, -1],
			[-1, 0],            [1, 0],
			[-1, 1],  [0, 1],  [1, 1],
		].map(([stepX, stepY]) => {
			const nx = clampX(x + stepX)
			const ny = clampY(y + stepY)
			return {
				stepX,
				stepY,
				nx,
				ny,
			}
		}).filter(option =>
			option.nx !== x || option.ny !== y
		)

		let best = options[0]!
		let bestScore = Number.NEGATIVE_INFINITY

		for (const option of options) {
			const afterDx = to.x - option.nx
			const afterDy = to.y - option.ny
			const distanceAfter = Math.hypot(afterDx, afterDy)
			const optionHeading = Math.atan2(option.stepY, option.stepX)
			const headingDelta = Math.atan2(
				Math.sin(optionHeading - heading),
				Math.cos(optionHeading - heading),
			)
			const distanceProgress = distance - distanceAfter
			const progressWeight = 1.25 + (closeness * 8.5)
			const headingWeight = 4.2 * (0.5 + biasStrength)
			const overshootPenalty = distanceAfter > distance ? 3.5 : 0
			const meanderNoise = (randy.random() - 0.5) * wobble * 1.25

			const score = (
				(distanceProgress * progressWeight) -
				(Math.abs(headingDelta) * headingWeight) -
				overshootPenalty +
				meanderNoise
			)

			if (score > bestScore) {
				best = option
				bestScore = score
			}
		}

		const stepX = best.nx - x
		const stepY = best.ny - y

		x = clampX(x + stepX)
		y = clampY(y + stepY)
		paint(x, y)
	}
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

	for (let i = 0; i < waypoints.length; i++) {
		for (let j = i + 1; j < waypoints.length; j++) {
			connectWaypointPairViaDrunkenFloorWandering({
				grid,
				randy,
				from: waypoints[i]!,
				to: waypoints[j]!,
				thickness,
				wobble,
			})
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

