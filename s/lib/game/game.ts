
import {Intent} from "@benev/tact"
import {applyDelta, Change, Entities, Id} from "@benev/archimedes"

import {Pod} from "./s2/pod.js"
import {runSystems} from "./s2/run-systems.js"
import {GameComponents} from "./parts/components.js"
import {IntentBucketMap} from "../../client/views/play/parts/recruiter.js"

export class Game {
	pod
	simulate
	entities = new Entities<GameComponents>()
	change = new Change<GameComponents>(delta => applyDelta(this.entities, delta))

	constructor(players: IntentBucketMap | null) {
		const change = new Change(delta => applyDelta(this.entities, delta))
		this.pod = new Pod(this.entities.readonly, change, players)
		this.simulate = runSystems(this.pod)
	}
}

