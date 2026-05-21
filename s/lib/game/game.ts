
import {Intent} from "@benev/tact"
import {applyDelta, Change, Entities, Id} from "@benev/archimedes"

import {Pod} from "./parts/pod.js"
import {systems} from "./systems.js"
import {consts} from "../../consts.js"
import {sprinkle} from "./utils/sprinkle.js"
import {GameComponents} from "./parts/components.js"
import {chunkify} from "../gridworld/chunk/chunkify.js"
import {equipmentize, itemize} from "./utils/itemize.js"
import {generateGridworld} from "../gridworld/generate.js"
import {IntentBucketMap} from "../../client/views/play/parts/recruiter.js"
import {lowerHover, lowerQuadcar, lowerTreads, lowerTrike} from "./archetypes/mech-lowers.js"
import {upperChonky, upperDapper, upperPragmatist, upperScout, upperUtilitarian} from "./archetypes/mech-upper.js"

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

		const possibilities = [
			itemize(rand, "oreCarbon"),
			itemize(rand, "oreColtan"),
			itemize(rand, "oreGold"),
			itemize(rand, "ingotGold"),
			itemize(rand, "ingotTantalum"),
			equipmentize(rand, "aCannon", {alpha: "aCannon"}),
			equipmentize(rand, "aDrill", {alpha: "aDrill"}),
			equipmentize(rand, "bDome", {bravo: "bDome"}),
			equipmentize(rand, "lowerHover", {mechLower: lowerHover()}),
			equipmentize(rand, "lowerTrike", {mechLower: lowerTrike()}),
			equipmentize(rand, "lowerQuadcar", {mechLower: lowerQuadcar()}),
			equipmentize(rand, "lowerTreads", {mechLower: lowerTreads()}),
			equipmentize(rand, "upperScout", {mechUpper: upperScout()}),
			equipmentize(rand, "upperPragmatist", {mechUpper: upperPragmatist()}),
			equipmentize(rand, "upperUtilitarian", {mechUpper: upperUtilitarian()}),
			equipmentize(rand, "upperChonky", {mechUpper: upperChonky()}),
			equipmentize(rand, "upperDapper", {mechUpper: upperDapper()}),
		]

		for (const position of sprinkle(gridworld, 1, 1_000)) {
			this.change.create(
				rand.pick(possibilities)(position.add_(0.5, 0.5))
			)
		}

		return this
	}
}

