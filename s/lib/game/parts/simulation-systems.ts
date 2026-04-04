
import {asSystems, change, lifecycle} from "@benev/archimedes"
import {Cortex} from "./cortex.js"
import {GameComponents} from "./components.js"

export const simulationSystems = ({entities}: Cortex) => asSystems<GameComponents>(
	lifecycle(entities, ["gridworld"], (id, components) => {
		return {
			tick(id, components) {},
			exit(id) {},
		}
	}),

	function* bleeding() {
		for (const [id, components] of entities.select("health", "bleed")) {
			if (components.bleed > 0) {
				const health = components.health - components.bleed
				yield change.merge(id, {health})
			}
		}
	},

	function* death() {
		for (const [id, components] of entities.select("health")) {
			if (components.health <= 0)
				yield change.delete(id)
		}
	},
)

