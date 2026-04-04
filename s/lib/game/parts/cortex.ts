
import {Entities} from "@benev/archimedes"
import {GameComponents} from "./components.js"

export class Cortex {
	entities

	constructor(entities: Entities<GameComponents>) {
		this.entities = entities.readonly()
	}
}

