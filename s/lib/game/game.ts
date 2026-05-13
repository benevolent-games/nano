
import {Intent} from "@benev/tact"
import {applyDelta, Change, Entities, Id} from "@benev/archimedes"

import {Pod} from "./parts/pod.js"
import {systems} from "./systems.js"
import {consts} from "../../consts.js"
import {GameComponents} from "./parts/components.js"
import {chunkify} from "../gridworld/chunk/chunkify.js"
import {generateGridworld} from "../gridworld/generate.js"
import {IntentBucketMap} from "../../client/views/play/parts/recruiter.js"

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
		const {seed, extent} = consts.map
		const gridworld = generateGridworld(seed, extent)
		this.change.create({gridworld: {extent: extent.array()}})
		for (const chunk of chunkify(gridworld))
			this.change.create(chunk)
		return this
	}
}

