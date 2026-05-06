
import {RMap} from "@e280/strata"
import {makeId} from "@benev/archimedes"
import {cycle, GMap, nap} from "@e280/stz"
import {Deck, IntentBucket, Port} from "@benev/tact"
import {PlayerId} from "../../../../lib/game/utils/players.js"

export class IntentBucketMap extends GMap<PlayerId, IntentBucket> {}

export class Recruiter {
	#players = new RMap<Port, PlayerId>()
	#ports = new RMap<PlayerId, Port>()

	constructor(private deck: Deck, private intentBuckets: IntentBucketMap[]) {}

	getPort(playerId: string) {
		return this.#ports.need(playerId)
	}

	listPlayers() {
		return [...this.#players.values()]
	}

	has(playerId: PlayerId) {
		return this.#ports.has(playerId)
	}

	syncWithPorts() {
		for (const port of this.deck.ports) {
			this.#players.guarantee(port, () => {
				const id = makeId()
				this.#ports.set(id, port)
				for (const map of this.intentBuckets)
					map.set(id, new IntentBucket())
				return id
			})
		}

		for (const [port, id] of this.#players.entries()) {
			if (!this.deck.ports.includes(port)) {
				this.#players.delete(port)
				for (const map of this.intentBuckets)
					map.delete(id)
				this.#ports.delete(id)
			}
		}
	}

	samplingLoop(hz = 120, getNow = () => Date.now()) {
		return cycle(async() => {
			this.#resolveIntents(getNow())
			await nap(1000 / hz)
		})
	}

	#resolveIntents(now: number) {
		for (const [port, playerId] of this.#players) {
			const intents = port.resolveIntents(now)
			for (const map of this.intentBuckets)
				map.get(playerId)?.accumulate(intents)
		}
	}
}

