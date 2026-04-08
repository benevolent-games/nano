
import {asSystems, lifecycle} from "@benev/archimedes"
import {Realm} from "./realm.js"
import {GameComponents} from "./components.js"

export const renderingSystems = ({entities}: Realm) => asSystems<GameComponents>(
	lifecycle(entities, ["gridworld"], (id, components) => {
		return {
			tick(id, components) {},
			exit(id) {},
		}
	}),
)

