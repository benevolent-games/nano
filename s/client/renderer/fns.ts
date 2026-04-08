
import {lifecycle} from "@benev/archimedes"
import {Realm} from "../../lib/game/parts/realm.js"

export const makeRendererFns = (realm: Realm) => [
	lifecycle(realm.entities, ["gridworld"], params => {
		return {
			tick(id, components) {},
			exit(id) {},
		}
	}),
]

