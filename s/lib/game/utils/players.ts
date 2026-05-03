
import {GMap} from "@e280/stz"
import {Id, makeId} from "@benev/archimedes"
import {Intent, mergeIntents} from "@benev/tact"

export class Player {
	#intents: Intent[] = []

	giveIntents(intents: Intent[]) {
		this.#intents = mergeIntents([...this.#intents, ...intents])
	}

	takeIntents() {
		const intents = this.#intents
		this.#intents = []
		return intents
	}
}

export class Players {
	#map = new GMap<string, Player>()

	entries() {
		return this.#map.entries()
	}

	add(player: Player) {
		const id = makeId()
		this.#map.set(id, player)
		return id
	}

	delete(id: Id) {
		this.#map.delete(id)
	}
}

