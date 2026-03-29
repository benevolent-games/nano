
import {Vec2} from "@benev/math"
import {expect, suite, test} from "@e280/science"
import {generateGridworld} from "./generate.js"
import {TileKind} from "./types.js"

export default suite({
	"render gridworld": test(async() => {
		const gridworld = generateGridworld(123, new Vec2(16, 16))
		expect(gridworld.tiles.length).ok()
	}),

	"deterministic by seed": test(async() => {
		const a = generateGridworld(123, new Vec2(64, 64))
		const b = generateGridworld(123, new Vec2(64, 64))
		const c = generateGridworld(124, new Vec2(64, 64))

		expect(Array.from(a.tiles).join(",")).is(Array.from(b.tiles).join(","))
		expect(Array.from(a.tiles).join(",")).not.is(Array.from(c.tiles).join(","))
	}),

	"southern border is always floor": test(async() => {
		const gridworld = generateGridworld(123, new Vec2(64, 64))
		const y = gridworld.extent.y - 1
		const rowStart = y * gridworld.extent.x

		for (let x = 0; x < gridworld.extent.x; x++)
			expect(gridworld.tiles[rowStart + x]).is(TileKind.Floor)
	}),

	"only emits terrain tile kinds for now": test(async() => {
		const gridworld = generateGridworld(123, new Vec2(48, 48))
		for (const tile of gridworld.tiles)
			expect(tile <= TileKind.Wall).ok()
	}),
})
