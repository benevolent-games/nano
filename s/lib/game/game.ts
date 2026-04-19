
import {Vec2} from "@benev/math"
import {Actions} from "@benev/tact/core"
import {applyDelta, Change, Entities, makeExecute} from "@benev/archimedes"

import {Space} from "./parts/space.js"
import {systems} from "./systems.js"
import {GameBindings} from "./parts/bindings.js"
import {GameComponents} from "./parts/components.js"
import {systematize} from "../tools/ecs-plus/sys.js"
import {chunkify} from "../gridworld/chunk/chunkify.js"
import {generateGridworld} from "../gridworld/generate.js"

export class Game {
	space
	stats
	simulate
	entities = new Entities<GameComponents>()
	change = new Change<GameComponents>(delta => applyDelta(this.entities, delta))

	constructor(actions: Actions<GameBindings>, poll: () => void) {
		this.space = new Space(this.entities.readonly, actions)

		const {fns, stats} = systematize(systems)
		this.stats = stats

		const simtick = makeExecute(
			this.entities,
			change => fns.map(fn => fn(this.space, change)),
		)

		this.simulate = () => {
			poll()
			simtick()
		}
	}

	initialize() {
		const gridworld = generateGridworld(1, Vec2.all(64))

		for (const chunk of chunkify(gridworld))
			this.change.create(chunk)

		this.change.create({
			graphic: "robot",
			controllable: true,
			position: [0, 0],
			physical: true,
			radius: 0.4,
			mass: 1,
			lerp: 0.5,
			velocity: [0, 0],
			speed: 5,
		})
	}
}

