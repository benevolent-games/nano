
import {EntitiesReadonly} from "@benev/archimedes"
import {RMap, wait, Waiter} from "@e280/strata"

import {Viewframe, makeViewframe} from "./viewframe.js"
import {Recruiter} from "../views/play/parts/recruiter.js"
import {GameComponents} from "../../lib/game/parts/components.js"

export class Multiframe {
	#frames = new RMap<string, Waiter<Viewframe>>()
	constructor(private entities: EntitiesReadonly<GameComponents>) {}

	get frames() {
		return [...this.#frames.values()]
	}

	#addPlayer(player: string) {
		const $viewframe = wait(makeViewframe(this.entities))
		this.#frames.set(player, $viewframe)
		return $viewframe
	}

	#deletePlayer(player: string) {
		this.#frames.delete(player)
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

