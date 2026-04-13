
import {Vec2} from "@benev/math"
import {Actions} from "@benev/tact/core"
import {cycle, nap} from "@e280/stz"
import {applyDelta, Change, Entities, makeExecute} from "@benev/archimedes"

import {systems} from "./systems.js"
import {Space} from "./parts/space.js"
import {GameBindings} from "./parts/bindings.js"
import {GameComponents} from "./parts/components.js"
import {chunkify} from "../gridworld/chunk/chunkify.js"
import {generateGridworld} from "../gridworld/generate.js"

export class Game {
	tickMs = 0
	entities = new Entities<GameComponents>()
	change = new Change<GameComponents>(delta => applyDelta(this.entities, delta))
	space
	simulate

	constructor(actions: Actions<GameBindings>, poll: () => void) {
		this.space = new Space(this.entities.readonly, actions)
		const simtick = makeExecute(this.entities, systems(this.space))
		this.simulate = () => {
			const start = performance.now()
			poll()
			simtick()
			this.tickMs = performance.now() - start
		}
	}

	initialize() {
		const gridworld = generateGridworld(1, new Vec2(1024, 1024))

		for (const chunk of chunkify(gridworld))
			this.change.create(chunk)

		this.change.create({graphic: "robot", controllable: true, position: [0, 0]})
	}

	simulationLoop() {
		return cycle(async() => {
			this.simulate()
			await nap(1000 / 60)
		})
	}
}

