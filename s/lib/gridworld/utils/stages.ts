import {count} from "@e280/stz"
import {makeNoiseSampler, Randy, Vec2} from "@benev/math"
import {Gridworld, TileKind} from "../types.js"
import {clampPointToGrid, forEachCell, paintSquareBrush, setTile} from "./grid.js"

export const getRandomPointNearMiddle = (
	grid: Gridworld,
	randy: Randy,
	fraction: number,
) => {
	const center = grid.extent.dup().subBy(1).half()
	const halfSpan = grid.extent.dup().mulBy(fraction / 2)

	return clampPointToGrid(
		grid,
		center.dup().add_(
			randy.range(-halfSpan.x, halfSpan.x),
			randy.range(-halfSpan.y, halfSpan.y),
		).round(),
	)
}

export const getPointsAroundBorder = (
	grid: Gridworld,
	randy: Randy,
	sectorSize: number,
) => {
	const {x: width, y: height} = grid.extent
	const lastX = width - 1
	const lastY = height - 1
	const points: Vec2[] = []

	const pick = (start: number, end: number) => {
		if (end <= start)
			return start
		return randy.integerRange(start, end)
	}

	const sectorRanges = (length: number) => [...count(Math.ceil(length / sectorSize))]
		.map(index => {
			const start = index * sectorSize
			const end = Math.min(length - 1, start + sectorSize - 1)
			return {start, end}
		})

	for (const {start, end} of sectorRanges(width)) {
		points.push(new Vec2(pick(start, end), 0))
		if (lastY > 0)
			points.push(new Vec2(pick(start, end), lastY))
	}

	for (const {start, end} of sectorRanges(height)) {
		points.push(new Vec2(0, pick(start, end)))
		if (lastX > 0)
			points.push(new Vec2(lastX, pick(start, end)))
	}

	return points
}

export const splotchySubstrate = ({
	grid,
	randy,
	walls,
	pits,
}: {
	grid: Gridworld
	randy: Randy
	walls: {
		probability: number
		scales: [number, number]
	}
	pits: {
		probability: number
		scales: [number, number]
	}
}) => {
	const noise = makeNoiseSampler(randy.random)
	const wallOffset = 1_337
	const pitOffset = 9_113

	const duplex = (
		x: number,
		y: number,
		offset: number,
		[a, b]: [number, number],
	) => (
		noise(x + offset, y + offset, a) +
		noise(x + (offset * 2), y + (offset * 2), b)
	) / 2

	forEachCell(grid, point => {
		const wallness = duplex(point.x, point.y, wallOffset, walls.scales)
		const pitness = duplex(point.x, point.y, pitOffset, pits.scales)

		let kind = wallness < walls.probability
			? TileKind.Wall
			: TileKind.Floor

		if (pitness < pits.probability)
			kind = TileKind.Pit

		setTile(grid, kind, point)
	})
}

const walkDrunkenSegment = ({
	grid,
	randy,
	from,
	to,
	thickness,
}: {
	grid: Gridworld
	randy: Randy
	from: Vec2
	to: Vec2
	thickness: number
}) => {
	const current = from.dup()
	paintSquareBrush(grid, TileKind.Floor, current, thickness)

	let safety = Math.max(grid.tiles.length * 2, 1)
	while (!current.equals(to) && safety-- > 0) {
		const dx = to.x - current.x
		const dy = to.y - current.y

		const stepX = dx === 0
			? 0
			: (dx > 0 ? 1 : -1)
		const stepY = dy === 0
			? 0
			: (dy > 0 ? 1 : -1)

		if (randy.roll(0.72)) {
			if (Math.abs(dx) > Math.abs(dy))
				current.add_(stepX, stepY !== 0 && randy.roll(0.35) ? stepY : 0)
			else if (Math.abs(dy) > Math.abs(dx))
				current.add_(stepX !== 0 && randy.roll(0.35) ? stepX : 0, stepY)
			else
				current.add_(stepX, stepY)
		}
		else {
			const wobbleX = stepX === 0
				? (randy.roll(0.5) ? 1 : -1)
				: stepX
			const wobbleY = stepY === 0
				? (randy.roll(0.5) ? 1 : -1)
				: stepY

			if (randy.roll(0.5))
				current.add_(wobbleX, 0)
			else
				current.add_(0, wobbleY)
		}

		clampPointToGrid(grid, current)
		paintSquareBrush(grid, TileKind.Floor, current, thickness)
	}

	paintSquareBrush(grid, TileKind.Floor, to, thickness)
}

export const carveDrunkenPathsBetweenWaypoints = ({
	grid,
	randy,
	paths,
	thickness,
	subdivisionDistance,
	deviation,
}: {
	grid: Gridworld
	randy: Randy
	paths: {
		from: Vec2
		to: Vec2
	}[]
	thickness: number
	subdivisionDistance: number
	deviation: number
}) => {
	for (const {from, to} of paths) {
		const distance = from.distance(to)
		const subdivisions = Math.max(0, Math.floor(distance / subdivisionDistance))
		const goalposts = [from.dup()]

		for (let i = 1; i <= subdivisions; i++) {
			const fraction = i / (subdivisions + 1)
			const goalpost = from.dup().lerp(to, fraction).round()
			goalpost.add_(
				Math.round(randy.range(-deviation, deviation)),
				Math.round(randy.range(-deviation, deviation)),
			)
			goalposts.push(clampPointToGrid(grid, goalpost))
		}

		goalposts.push(to.dup())

		for (let i = 1; i < goalposts.length; i++) {
			walkDrunkenSegment({
				grid,
				randy,
				from: goalposts[i - 1]!,
				to: goalposts[i]!,
				thickness,
			})
		}
	}
}

export const southernFlooringGradient = (
	grid: Gridworld,
	randy: Randy,
	fraction: number,
	noiseScale: number,
) => {
	const noise = makeNoiseSampler(randy.random)
	const fadeStartY = grid.extent.y * (1 - fraction)

	forEachCell(grid, point => {
		if (point.y < fadeStartY)
			return

		const distanceFromFadeStart = point.y - fadeStartY
		const bandHeight = Math.max(1, (grid.extent.y - 1) - fadeStartY)
		const southness = Math.max(0, Math.min(1, distanceFromFadeStart / bandHeight))
		const probability = southness
		const localNoise = noise(point.x + 4_221, point.y + 4_221, noiseScale)

		if (localNoise <= probability)
			setTile(grid, TileKind.Floor, point)
	})
}
