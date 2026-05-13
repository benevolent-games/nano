
import {need} from "@e280/stz"
import {EntitiesReadonly} from "@benev/archimedes"

import {Pool} from "./pool.js"
import {Venue} from "./venue.js"
import {getProps} from "./buddy.js"
import {poolify} from "./poolify.js"
import {robot} from "../props/robot.js"
import {selbox} from "../props/selbox.js"
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
		const {scene} = venue
		const props = getProps(art)
		this.pools = {
			floors: new Pool(poolify(need(props, "base-floor1"))).prepopulate(2000),
			walls: new Pool(poolify(need(props, "rock-pillarcluster1"))).prepopulate(2000),
			robots: new Pool(poolify(robot(scene))).prepopulate(10),
			chassis: new Pool(poolify(need(props, "robot-chassis"))).prepopulate(32),
			toolDrill: new Pool(poolify(need(props, "tool-drill"))).prepopulate(32),
			toolCannon: new Pool(poolify(need(props, "tool-cannon"))).prepopulate(32),
			selboxes: new Pool(poolify(selbox(scene))).prepopulate(10),
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

