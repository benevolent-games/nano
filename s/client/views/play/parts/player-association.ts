
import {GMap} from "@e280/stz"
import {tracker} from "@e280/strata"
import {makeId} from "@benev/archimedes"
import {Deck, Intent} from "@benev/tact"

type Port = string
type Player = string

export class PlayerAssociation {
	#playerIntents = new GMap<Player, Intent[]>
	#playerByPort = new GMap<Port, Player>()

	get playerIntents() {
		tracker.read(this)
		return this.#playerIntents
	}

	consider(deck: Deck, now: number) {
		tracker.read(this)

		let changes = 0
		const activePlayers: Player[] = []

		console.log("ports", [...deck.ports])

		// update active
		for (const port of deck.ports) {
			const player = this.#playerByPort.guarantee(port, () => {
				changes++
				return makeId()
			})
			this.playerIntents.set(player, deck.resolvePort(port, now))
			activePlayers.push(player)
		}

		// delete inactive
		Array.from(this.playerIntents.keys())
			.filter(player => !activePlayers.includes(player))
			.forEach(player => {
				changes++
				this.playerIntents.delete(player)
			})

		if (changes > 0)
			tracker.write(this)

		return this.playerIntents
	}
}

