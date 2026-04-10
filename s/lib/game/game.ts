
import {cycle, nap} from "@e280/stz"
import {applyDelta, Change, Entities, makeExecute} from "@benev/archimedes"
import {systems} from "./systems.js"
import {Space} from "./parts/space.js"
import {GameComponents} from "./parts/components.js"

export class Game {
	entities = new Entities<GameComponents>()
	space = new Space(this.entities.readonly)
	simulate = makeExecute(this.entities, systems(this.space))
	change = new Change<GameComponents>(
		delta => applyDelta(this.entities, delta)
	)

	initializeGridworld() {
		this.change.create({
			gridworld: {seed: 1, extent: [64, 64]},
		})
	}

	simulationLoop() {
		return cycle(async() => {
			this.simulate()
			await nap(1000 / 60)
		})
	}
}

