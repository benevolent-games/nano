
import {Vec2} from "@benev/math"
import {asSystems, lifecycle} from "@benev/archimedes"
import {Realm} from "./parts/realm.js"
import {GameComponents} from "./parts/components.js"
import {generateGridworld} from "../gridworld/generate.js"

export const systems = (realm: Realm) => asSystems<GameComponents>(change => [
	lifecycle(realm.entities, ["gridworld"], (id, components) => {
		const {seed, extent} = components.gridworld
		realm.gridworlds.guarantee(id, () => generateGridworld(seed, Vec2.from(extent)))
		return {
			tick(_id, _components) {},
			exit(id) {
				realm.gridworlds.delete(id)
			},
		}
	}),
])

