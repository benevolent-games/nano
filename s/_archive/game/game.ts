
import {Intent} from "@benev/tact"
import {applyDelta, Change, Entities, Id} from "@benev/archimedes"

import {Pod} from "./parts/pod.js"
import {systems} from "./systems.js"
import {consts} from "../../consts.js"
import {sprinkle} from "./utils/sprinkle.js"
import {GameComponents} from "./parts/components.js"
import {chunkify} from "../../lib/gridworld/chunk/chunkify.js"
// import {equipmentize, itemize} from "./utils/itemize.js"
import {generateGridworld} from "../../lib/gridworld/generate.js"
import {IntentBucketMap} from "../../client/views/play/parts/recruiter.js"
import {lowerHover, lowerQuadcar, lowerTreads, lowerTrike} from "./archetypes/mech-lowers.js"
import {upperChonky, upperDapper, upperPragmatist, upperScout, upperUtilitarian} from "./archetypes/mech-upper.js"
import { degrees, Vec2 } from "@benev/math"
import { archetype } from "./utils/archetype.js"
import { art } from "./art.js"
import { itemize } from "./utils/itemize.js"
import { guarantee, Rand, seed } from "@e280/stz"

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

		const gridworld = generateGridworld(consts.map.seed, consts.map.extent)
		this.change.create({gridworld: {extent: consts.map.extent.array()}})

		for (const chunk of chunkify(gridworld))
			this.change.create(chunk)

		const item = (artkey: keyof typeof art, components: Partial<GameComponents>) =>
			(position: Vec2): Partial<GameComponents> => ({
				...itemize({artkey, position, rand}),
				...components,
			})

		const resources = [
			item("oreCarbon", {}),
			item("oreColtan", {}),
			item("oreGold", {}),
			item("ingotGold", {}),
			item("ingotTantalum", {}),
		]

		const equipment = [
			item("aCannon", {equipmentAlpha: {art: "aCannon"}}),
			item("aDrill", {equipmentAlpha: {art: "aDrill"}}),
			item("bDome", {equipmentBravo: {art: "bDome"}}),
		]

		const mechparts = [
			item("lowerTrike", {mechLower: lowerTrike(), scale: consts.robotScale}),
			item("lowerHover", {mechLower: lowerHover(), scale: consts.robotScale}),
			item("lowerQuadcar", {mechLower: lowerQuadcar(), scale: consts.robotScale}),
			item("lowerTreads", {mechLower: lowerTreads(), scale: consts.robotScale}),
			item("upperScout", {mechUpper: upperScout(), scale: consts.robotScale}),
			item("upperPragmatist", {mechUpper: upperPragmatist(), scale: consts.robotScale}),
			item("upperUtilitarian", {mechUpper: upperUtilitarian(), scale: consts.robotScale}),
			item("upperChonky", {mechUpper: upperChonky(), scale: consts.robotScale}),
			item("upperDapper", {mechUpper: upperDapper(), scale: consts.robotScale}),
		]

		const n = (gridworld.extent.x * gridworld.extent.y) / 10
		const map = new Map<string, {count: number}>()

		for (const position of sprinkle(gridworld, rand.u32(), n)) {
			const possibilities = rand.pick([resources, equipment, mechparts])
			const item = rand.pick(possibilities)(position.add_(0.5, 0.5))
			guarantee(map, item.art, () => ({count: 0})).count++
			this.change.create(item)
		}

		return this
	}
}

