
import {GMap} from "@e280/stz"
import {Entities, Id} from "@benev/archimedes"
import {GameComponents} from "./components.js"
import {Gridworld} from "../../gridworld/types.js"

export class Realm {
	entities
	gridworlds = new GMap<Id, Gridworld>()

	constructor(entities: Entities<GameComponents>) {
		this.entities = entities.readonly()
	}
}

