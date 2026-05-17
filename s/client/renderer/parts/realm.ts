
import {need} from "@e280/stz"
import {EntitiesReadonly} from "@benev/archimedes"

import {Pool} from "./pool.js"
import {Venue} from "./venue.js"
import {getProps} from "./buddy.js"
import {poolify} from "./poolify.js"
import {Timing} from "../../../lib/tools/timing.js"
import {PlayerId} from "../../../lib/game/utils/players.js"
import {AssetContainer} from "@babylonjs/core/assetContainer.js"
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"
import {GameComponents} from "../../../lib/game/parts/components.js"

export class Realm {
	pools
	timing = new Timing(10, 240)
	readonly focal = new Gridspace()

	constructor(
			public entities: EntitiesReadonly<GameComponents>,
			public playerId: PlayerId,
			public venue: Venue,
			public art: AssetContainer,
		) {
		const props = getProps(art)
		this.pools = {
			indicator: new Pool(poolify(need(props, "indicator"))).prepopulate(1),

			floor1: new Pool(poolify(need(props, "floor1"))).prepopulate(128),
			wall1: new Pool(poolify(need(props, "wall1"))).prepopulate(128),
			wall2: new Pool(poolify(need(props, "wall2"))).prepopulate(128),
			wall3: new Pool(poolify(need(props, "wall3"))).prepopulate(128),
			wall4: new Pool(poolify(need(props, "wall4"))).prepopulate(128),
			wall5: new Pool(poolify(need(props, "wall5"))).prepopulate(128),
			wall6: new Pool(poolify(need(props, "wall6"))).prepopulate(128),

			lowerQuadcar: new Pool(poolify(need(props, "lower-quadcar"))).prepopulate(8),
			lowerTreads: new Pool(poolify(need(props, "lower-treads"))).prepopulate(8),
			lowerTrike: new Pool(poolify(need(props, "lower-trike"))).prepopulate(8),

			upperScout: new Pool(poolify(need(props, "upper-scout"))).prepopulate(8),
			upperPragmatist: new Pool(poolify(need(props, "upper-pragmatist"))).prepopulate(8),
			upperUtilitarian: new Pool(poolify(need(props, "upper-utilitarian"))).prepopulate(8),
			upperChonky: new Pool(poolify(need(props, "upper-chonky"))).prepopulate(8),
			upperDapper: new Pool(poolify(need(props, "upper-dapper"))).prepopulate(8),

			aCannon: new Pool(poolify(need(props, "a-cannon"))).prepopulate(16),
			aDrill: new Pool(poolify(need(props, "a-drill"))).prepopulate(16),
			bDome: new Pool(poolify(need(props, "b-dome"))).prepopulate(16),

			oreCarbon: new Pool(poolify(need(props, "ore-carbon"))).prepopulate(16),
			oreColtan: new Pool(poolify(need(props, "ore-coltan"))).prepopulate(16),
			oreGold: new Pool(poolify(need(props, "ore-gold"))).prepopulate(16),

			ingotTantalum: new Pool(poolify(need(props, "ingot-tantalum"))).prepopulate(16),
			ingotGold: new Pool(poolify(need(props, "ingot-gold"))).prepopulate(16),

			structHub: new Pool(poolify(need(props, "struct-hub"))).prepopulate(16),
			structRefinery: new Pool(poolify(need(props, "struct-refinery"))).prepopulate(16),
			structConstructor: new Pool(poolify(need(props, "struct-constructor"))).prepopulate(16),
		}
	}

	poolReport() {
		for (const [key, pool] of Object.entries(this.pools))
			console.log(`pool ${key} size ${pool.size}`)
	}

	dispose() {
		this.venue.scene.dispose()
	}
}

