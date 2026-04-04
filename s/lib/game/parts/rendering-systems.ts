
import {asSystems, lifecycle} from "@benev/archimedes"
import {Cortex} from "./cortex.js"
import {GameComponents} from "./components.js"

export const renderingSystems = ({entities}: Cortex) => asSystems<GameComponents>(
	lifecycle(entities, ["gridworld"], (id, components) => {
		return {
			tick(id, components) {},
			exit(id) {},
		}
	}),
)

