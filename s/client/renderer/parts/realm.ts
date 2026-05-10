
import {EntitiesReadonly} from "@benev/archimedes"
import {Pool} from "./pool.js"
import {Venue} from "./venue.js"
import {poolify} from "./poolify.js"
import {wall} from "../props/wall.js"
import {robot} from "../props/robot.js"
import {floor} from "../props/floor.js"
import {selbox} from "../props/selbox.js"
import {Timing} from "../../../lib/tools/timing.js"
import {PlayerId} from "../../../lib/game/utils/players.js"
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
		) {
		const {scene} = venue
		this.pools = {
			floors: new Pool(poolify(floor(scene))).prepopulate(2000),
			walls: new Pool(poolify(wall(scene))).prepopulate(2000),
			robots: new Pool(poolify(robot(scene))).prepopulate(10),
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

