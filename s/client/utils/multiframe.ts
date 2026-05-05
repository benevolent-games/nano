
import {EntitiesReadonly} from "@benev/archimedes"
import {RMap, wait, WaitDerived} from "@e280/strata"

import {Viewframe, makeViewframe} from "./viewframe.js"
import {GameComponents} from "../../lib/game/parts/components.js"
import {PlayerAssociation} from "../views/play/parts/player-association.js"

export class Multiframe {
	#frames = new RMap<string, WaitDerived<Viewframe>>()
	constructor(private entities: EntitiesReadonly<GameComponents>) {}

	listFrames() {
		return [...this.#frames.values()]
	}

	spawn(player: string) {
		const $viewframe = wait(makeViewframe(this.entities))
		this.#frames.set(player, $viewframe)
		return $viewframe
	}

	despawn(player: string) {
		this.#frames.delete(player)
	}

	sync({playerIntents}: PlayerAssociation) {
		console.log("sync")
		for (const player of playerIntents.keys()) {
			if (!this.#frames.has(player)) {
				console.log("SPAWN", player)
				this.spawn(player)
			}
		}

		for (const player of this.#frames.keys()) {
			if (!playerIntents.has(player))
				this.despawn(player)
		}

		return this.listFrames()
	}
}

