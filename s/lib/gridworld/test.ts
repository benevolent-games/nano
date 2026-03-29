
import {Vec2} from "@benev/math"
import {expect, suite, test} from "@e280/science"
import {generateGridworld, renderGridworld} from "./sketch.js"

export default suite({
	"render gridworld": test(async() => {
		const gridworld = generateGridworld(new Vec2(16, 16))
		const s = renderGridworld(gridworld)
		expect(s).ok()
	}),
})

