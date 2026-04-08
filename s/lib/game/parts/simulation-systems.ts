
import {Vec2} from "@benev/math"
import {asSystems, lifecycle} from "@benev/archimedes"
import {Realm} from "./realm.js"
import {GameComponents} from "./components.js"
import {generateGridworld} from "../../gridworld/generate.js"

export const simulationSystems = (realm: Realm) => asSystems<GameComponents>(

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

	

	// function* bleeding() {
	// 	for (const [id, components] of entities.select("health", "bleed")) {
	// 		if (components.bleed > 0) {
	// 			const health = components.health - components.bleed
	// 			yield change.merge(id, {health})
	// 		}
	// 	}
	// },
	//
	// function* death() {
	// 	for (const [id, components] of entities.select("health")) {
	// 		if (components.health <= 0)
	// 			yield change.delete(id)
	// 	}
	// },
)

