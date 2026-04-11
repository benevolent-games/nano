
import {cycle, nap} from "@e280/stz"
import {Actions} from "@benev/tact/core"
import {applyDelta, Change, Entities, makeExecute} from "@benev/archimedes"

import {systems} from "./systems.js"
import {Space} from "./parts/space.js"
import {GameBindings} from "./parts/bindings.js"
import {GameComponents} from "./parts/components.js"

export class Game {
	entities = new Entities<GameComponents>()
	change = new Change<GameComponents>(delta => applyDelta(this.entities, delta))
	space
	simulate

	constructor(actions: Actions<GameBindings>, poll: () => void) {
		this.space = new Space(this.entities.readonly, actions)
		const simtick = makeExecute(this.entities, systems(this.space))
		this.simulate = () => {
			poll()
			simtick()
		}
	}

	initialize() {
		this.change.create({gridworld: {seed: 1, extent: [64, 64]}})
		this.change.create({graphic: "robot", controllable: true, position: [0, 0]})
	}

	simulationLoop() {
		return cycle(async() => {
			this.simulate()
			await nap(1000 / 60)
		})
	}
}

