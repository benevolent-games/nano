
import {need} from "@e280/stz"
import {Vec3} from "@benev/math"
import {EntitiesReadonly} from "@benev/archimedes"

import {Pool} from "./pool.js"
import {Venue} from "./venue.js"
import {box} from "../props/box.js"
import {getProps} from "./buddy.js"
import {poolify} from "./poolify.js"
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

			chassis: new Pool(poolify(need(props, "robot-chassis"))).prepopulate(32),
			selboxes: new Pool(poolify(selbox(scene))).prepopulate(10),

			toolDrill: new Pool(poolify(need(props, "tool-drill"))).prepopulate(32),
			toolCannon: new Pool(poolify(need(props, "tool-cannon"))).prepopulate(32),
			carbon: new Pool(poolify(box(scene, new Vec3(0.2, 0.2, 0.2)))).prepopulate(32),
			battery: new Pool(poolify(box(scene, new Vec3(0.1, 0.4, 0.8)))).prepopulate(32),
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

