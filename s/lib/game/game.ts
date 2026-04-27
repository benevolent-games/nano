
import {Actions} from "@benev/tact/core"
import {applyDelta, Change, Entities, makeExecute} from "@benev/archimedes"

import {Space} from "./parts/space.js"
import {systems} from "./systems.js"
import {GameBindings} from "./parts/bindings.js"
import {GameComponents} from "./parts/components.js"
import {systematize} from "../tools/ecs-plus/sys.js"

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
}

