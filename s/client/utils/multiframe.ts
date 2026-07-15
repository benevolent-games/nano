
import {EntitiesReadonly} from "@benev/archimedes"
import {RMap, wait, Waiter} from "@e280/strata"

import {Basis} from "../types.js"
import {Recruiter} from "./recruiter.js"
import {PlayerId} from "../../lib/game/types.js"
import {Viewframe, makeViewframe} from "./viewframe.js"
import {GameComponents} from "../../lib/game/parts/components.js"

export class Multiframe {
	#frames = new RMap<PlayerId, Waiter<Viewframe>>()
	constructor(private basis: Basis, private entities: EntitiesReadonly<GameComponents>) {}

	get frames() {
		return [...this.#frames.values()]
	}

	#addPlayer(playerId: string) {
		const $viewframe = wait(makeViewframe(this.basis.artGlb, this.entities, playerId))
		this.#frames.set(playerId, $viewframe)
		return $viewframe
	}

	#deletePlayer(playerId: string) {
		this.#frames.delete(playerId)
	}

	sync(recruiter: Recruiter) {
		for (const player of recruiter.listPlayers()) {
			if (!this.#frames.has(player)) {
				this.#addPlayer(player)
			}
		}

		for (const player of this.#frames.keys()) {
			if (!recruiter.has(player)) {
				this.#deletePlayer(player)
			}
		}

		return this.frames
	}
}

