
import {Vec2} from "@benev/math"
import {expect, suite, test} from "@e280/science"
import {generateGridworld} from "./sketch.js"

export default suite({
	"render gridworld": test(async() => {
		const gridworld = generateGridworld(123, new Vec2(16, 16))
		expect(gridworld.tiles.length).ok()
	}),
})

