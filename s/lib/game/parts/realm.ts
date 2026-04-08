
import {GMap} from "@e280/stz"
import {EntitiesReadonly, Id} from "@benev/archimedes"

import {GameComponents} from "./components.js"
import {Gridworld} from "../../gridworld/types.js"

export class Realm {
	gridworlds = new GMap<Id, Gridworld>()
	constructor(public entities: EntitiesReadonly<GameComponents>) {}
}

