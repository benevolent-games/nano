
import {cycle, nap} from "@e280/stz"
import {Entities, makeExecute} from "@benev/archimedes"
import {systems} from "./systems.js"
import {Space} from "./parts/space.js"
import {GameComponents} from "./parts/components.js"

export class Game {
	entities = new Entities<GameComponents>()
	space = new Space(this.entities.readonly)
	simulate = makeExecute(this.entities, systems(this.space))

	simulationLoop() {
		return cycle(async() => {
			this.simulate()
			await nap(1000 / 60)
		})
	}
}

