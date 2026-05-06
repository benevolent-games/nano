
import {RMap} from "@e280/strata"
import {makeId} from "@benev/archimedes"
import {Deck, Intent, Port} from "@benev/tact"

type Player = string

export class Players {
	intents = new RMap<Player, Intent[]>
	#players = new RMap<Port, Player>()

	constructor(private deck: Deck) {}

	update() {
		const activePlayers: Player[] = []

		// update active
		for (const port of this.deck.ports) {
			const player = this.#players.guarantee(port, () => makeId())
			activePlayers.push(player)
		}

		// delete inactive
		Array.from(this.intents.keys())
			.filter(player => !activePlayers.includes(player))
			.forEach(player => this.intents.delete(player))

		return this.intents
	}

	resolveIntents(now: number) {
		for (const port of this.deck.ports) {
			const player = this.#players.get(port)
			if (!player) continue
			this.intents.set(player, port.resolveIntents(now))
		}
		return this.intents
	}
}

