
import {EntitiesReadonly} from "@benev/archimedes"
import {RSet, wait, WaitSignal} from "@e280/strata"

import {Viewframe, makeViewframe} from "./viewframe.js"
import {GameComponents} from "../../lib/game/parts/components.js"

export class Multiframe {
	#frames = new RSet<WaitSignal<Viewframe>>()
	constructor(private entities: EntitiesReadonly<GameComponents>) {}

	list() {
		return [...this.#frames]
	}

	spawn() {
		const $arcade = wait(makeViewframe(this.entities))
		this.#frames.add($arcade)
		return $arcade
	}

	despawn($arcade: WaitSignal<Viewframe>) {
		this.#frames.delete($arcade)
	}
}

