
import {Intent} from "@benev/tact"
import {applyDelta, Change, Entities, Id, makeExecute} from "@benev/archimedes"

import {systems} from "./systems.js"
import {Space} from "./parts/space.js"
import {systematize} from "../tools/ecs-plus/sys.js"
import {GameComponents} from "./parts/components.js"
import {IntentBucketMap} from "../../client/views/play/parts/recruiter.js"

export class Game {
	space
	stats
	simulate
	entities = new Entities<GameComponents>()
	change = new Change<GameComponents>(delta => applyDelta(this.entities, delta))

	constructor(players: IntentBucketMap | null) {
		this.space = new Space(this.entities.readonly, players)

		const {fns, stats} = systematize(systems)
		this.stats = stats

		const simtick = makeExecute(
			this.entities,
			change => fns.map(fn => fn(this.space, change)),
		)

		this.simulate = () => {
			simtick()
		}
	}
}

