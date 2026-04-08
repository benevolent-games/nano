
import {cycle, nap} from "@e280/stz"
import {Entities, makeExecute} from "@benev/archimedes"
import {Realm} from "./parts/realm.js"
import {systems} from "./systems.js"
import {GameComponents} from "./parts/components.js"

export class Game {
	entities = new Entities<GameComponents>()
	realm = new Realm(this.entities.readonly)
	simulate = makeExecute(this.entities, systems(this.realm))

	simulationLoop() {
		return cycle(async() => {
			this.simulate()
			await nap(1000 / 60)
		})
	}
}

