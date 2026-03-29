
import {Vec2} from "@benev/math"
import {run, test} from "@e280/science"
import {generateGridworld, renderGridworld} from "./sketch.js"

const n = 64

await run({
	"render gridworld": test(async() => {
		const gridworld = generateGridworld(new Vec2(n, n))
		const s = renderGridworld(gridworld)
		console.log("")
		console.log(s)
	}),
})

