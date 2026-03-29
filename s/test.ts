
import {run, test} from "@e280/science"
import {generateGridworld, renderGridworld} from "./sketch.js"
import {Vec2} from "@benev/math"

await run({
	"render gridworld": test(async() => {
		const gridworld = generateGridworld(new Vec2(32, 32))
		const s = renderGridworld(gridworld)
		console.log(s)
	}),
})

