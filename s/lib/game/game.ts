
import {Intent} from "@benev/tact"
import {degrees} from "@benev/math"
import {applyDelta, Change, Entities, Id} from "@benev/archimedes"

import {Pod} from "./parts/pod.js"
import {systems} from "./systems.js"
import {consts} from "../../consts.js"
import {ItemKind} from "./parts/ctypes.js"
import {sprinkle} from "./utils/sprinkle.js"
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
		const {rand} = this.pod

		const gridworld = generateGridworld(seed, extent)
		this.change.create({gridworld: {extent: extent.array()}})

		for (const chunk of chunkify(gridworld))
			this.change.create(chunk)

		const items: ItemKind[] = [
			"carbon",
			"battery",
			"drill",
			"cannon",
		]

		for (const position of sprinkle(gridworld, 1, 1_000)) {
			this.change.create({
				size: [consts.robotScale, consts.robotScale],
				position: position.add_(0.5, 0.5).array(),
				pickupable: rand.pick(items),
				rotation: rand.range(degrees(0), degrees(360)),
				targetable: true,
			})
		}

		return this
	}
}

