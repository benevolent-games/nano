
import {EntitiesReadonly} from "@benev/archimedes"
import {Pool} from "./pool.js"
import {Venue} from "./venue.js"
import {poolify} from "./poolify.js"
import {wall} from "../props/wall.js"
import {robot} from "../props/robot.js"
import {floor} from "../props/floor.js"
import {Timing} from "../../../lib/tools/timing.js"
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"
import {GameComponents} from "../../../lib/game/parts/components.js"

export class Realm {
	pools
	focal = new Gridspace()
	timing = new Timing(10, 240)

	constructor(
			public entities: EntitiesReadonly<GameComponents>,
			public venue: Venue,
		) {
		const {scene} = venue
		this.pools = {
			floors: new Pool(poolify(floor(scene))).prepopulate(2000),
			walls: new Pool(poolify(wall(scene))).prepopulate(2000),
			robots: new Pool(poolify(robot(scene))).prepopulate(10),
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

