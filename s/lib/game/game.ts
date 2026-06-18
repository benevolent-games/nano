
import {Intent} from "@benev/tact"
import {Rand, seed} from "@e280/stz"
import {applyDelta, Change, Entities, Id} from "@benev/archimedes"

import {Pod} from "./parts/pod.js"
import {systems} from "./systems.js"
import {consts} from "../../consts.js"
import {GameComponents} from "./parts/components.js"
import {IntentBucketMap} from "./utils/intent-bucket-map.js"

export class Game {
	pod
	simulate
	entities = new Entities<GameComponents>()
	change = new Change<GameComponents>(delta => applyDelta(this.entities, delta))

	constructor(players: IntentBucketMap | null) {
		const change = new Change(delta => applyDelta(this.entities, delta))
		this.pod = new Pod(this.entities.readonly, change, players)
		this.simulate = systems(this.pod)
	}

	init() {
		const rand = new Rand(seed(consts.map.seed))
		this.change.create({})
		return this
	}
}

