
import {assert} from "../../../utils/assert.js"
import {Gridworld, TileKind} from "../../../../lib/gridworld/types.js"

const look = {
	background: {
		top: "#0f1726",
		bottom: "#05070d",
		vignette: "rgba(0, 0, 0, 0.34)",
	},
	board: {
		fill: "#0c1220",
		border: "#2a3955",
		innerGlow: "rgba(135, 173, 255, 0.08)",
		shadow: "rgba(0, 0, 0, 0.38)",
	},
	grid: {
		line: "rgba(190, 214, 255, 0.06)",
		lineStrong: "rgba(190, 214, 255, 0.1)",
	},
	tiles: {
		[TileKind.Pit]: {
			fill: "#02050b",
			inset: "#0a1020",
			accent: "rgba(80, 113, 181, 0.26)",
		},
		[TileKind.Floor]: {
			fill: "#1c2a3f",
			inset: "#293d58",
			accent: "rgba(157, 213, 255, 0.08)",
		},
		[TileKind.Wall]: {
			fill: "#4b596c",
			inset: "#647892",
			accent: "rgba(232, 239, 255, 0.08)",
		},
		[TileKind.Coltan]: {
			fill: "#143b4e",
			inset: "#1d617d",
			accent: "rgba(77, 232, 255, 0.18)",
		},
	},
} as const

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

export function renderGridworld(gridworld: Gridworld, canvas: HTMLCanvasElement | OffscreenCanvas) {
	const start = performance.now()
	const done = () => performance.now() - start

	const ctx = assert(canvas.getContext("2d"), "failed to get 2d canvas")
	const {x: tilesWide, y: tilesHigh} = gridworld.extent
	const {width, height} = canvas

	if (width <= 0 || height <= 0 || tilesWide <= 0 || tilesHigh <= 0)
		return done()

	ctx.clearRect(0, 0, width, height)
	ctx.imageSmoothingEnabled = false

	const backgroundGradient = ctx.createLinearGradient(0, 0, 0, height)
	backgroundGradient.addColorStop(0, look.background.top)
	backgroundGradient.addColorStop(1, look.background.bottom)
	ctx.fillStyle = backgroundGradient
	ctx.fillRect(0, 0, width, height)

	const tileSize = Math.min(width / tilesWide, height / tilesHigh)
	const worldWidth = tileSize * tilesWide
	const worldHeight = tileSize * tilesHigh
	const offsetX = (width - worldWidth) / 2
	const offsetY = (height - worldHeight) / 2

	ctx.save()
	ctx.translate(offsetX, offsetY)

	ctx.shadowColor = look.board.shadow
	ctx.shadowBlur = Math.max(12, tileSize * 0.75)
	ctx.fillStyle = look.board.fill
	ctx.fillRect(0, 0, worldWidth, worldHeight)
	ctx.shadowBlur = 0

	ctx.strokeStyle = look.board.border
	ctx.lineWidth = clamp(tileSize * 0.08, 1, 3)
	ctx.strokeRect(0.5, 0.5, worldWidth - 1, worldHeight - 1)

	const innerGlow = ctx.createLinearGradient(0, 0, worldWidth, worldHeight)
	innerGlow.addColorStop(0, look.board.innerGlow)
	innerGlow.addColorStop(1, "rgba(0, 0, 0, 0)")
	ctx.fillStyle = innerGlow
	ctx.fillRect(0, 0, worldWidth, worldHeight)

	const gutter = tileSize > 3
		? clamp(tileSize * 0.08, 0.5, 2)
		: 0
	const inset = tileSize > 6
		? clamp(tileSize * 0.16, 0.75, tileSize * 0.3)
		: 0
	const accentHeight = tileSize > 5
		? clamp(tileSize * 0.14, 0.5, 3)
		: 0

	for (let y = 0; y < tilesHigh; y++) {
		const row = y * tilesWide
		const py = y * tileSize

		for (let x = 0; x < tilesWide; x++) {
			const kind = gridworld.tiles[row + x] as TileKind
			const palette = look.tiles[kind]
			const px = x * tileSize
			const tx = px + gutter
			const ty = py + gutter
			const tw = Math.max(0, tileSize - (gutter * 2))
			const th = Math.max(0, tileSize - (gutter * 2))

			ctx.fillStyle = palette.fill
			ctx.fillRect(tx, ty, tw, th)

			if (tw > inset * 2 && th > inset * 2) {
				ctx.fillStyle = palette.inset
				ctx.fillRect(
					tx + inset,
					ty + inset,
					tw - (inset * 2),
					th - (inset * 2),
				)
			}

			if (accentHeight > 0) {
				ctx.fillStyle = palette.accent
				ctx.fillRect(tx, ty, tw, accentHeight)
			}
		}
	}

	ctx.strokeStyle = tileSize >= 6
		? look.grid.lineStrong
		: look.grid.line
	ctx.lineWidth = 1
	ctx.beginPath()

	for (let x = 1; x < tilesWide; x++) {
		const px = Math.round(x * tileSize) + 0.5
		ctx.moveTo(px, 0)
		ctx.lineTo(px, worldHeight)
	}

	for (let y = 1; y < tilesHigh; y++) {
		const py = Math.round(y * tileSize) + 0.5
		ctx.moveTo(0, py)
		ctx.lineTo(worldWidth, py)
	}

	ctx.stroke()
	ctx.restore()

	const vignette = ctx.createRadialGradient(
		width / 2,
		height / 2,
		Math.min(width, height) * 0.2,
		width / 2,
		height / 2,
		Math.max(width, height) * 0.75,
	)
	vignette.addColorStop(0, "rgba(0, 0, 0, 0)")
	vignette.addColorStop(1, look.background.vignette)
	ctx.fillStyle = vignette
	ctx.fillRect(0, 0, width, height)

	return done()
}
