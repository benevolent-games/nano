
import {cycle, nap} from "@e280/stz"
import {Entities, executeSystems} from "@benev/archimedes"
import {Cortex} from "./parts/cortex.js"
import {rafloop} from "../tools/rafloop.js"
import {GameComponents} from "./parts/components.js"
import {renderingSystems} from "./parts/rendering-systems.js"
import {executeRendering} from "./utils/execute-rendering.js"
import {simulationSystems} from "./parts/simulation-systems.js"

export class Game {
	entities = new Entities<GameComponents>()
	cortex = new Cortex(this.entities)
	simulationSystems = simulationSystems(this.cortex)
	renderingSystems = renderingSystems(this.cortex)

	simulationLoop() {
		return cycle(async() => {
			executeSystems(this.entities, this.simulationSystems)
			await nap(1000 / 60)
		})
	}

	renderLoop() {
		return rafloop(() => executeRendering(this.renderingSystems))
	}
}

