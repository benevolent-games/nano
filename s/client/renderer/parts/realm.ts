
import {Pool} from "./pool.js"
import {Venue} from "./venue.js"
import {poolify} from "./poolify.js"
import {wall} from "../props/wall.js"
import {robot} from "../props/robot.js"
import {floor} from "../props/floor.js"
import {Gridspace} from "../../../lib/game/parts/units.js"

export class Realm {
	pools
	focal = new Gridspace(0, 0)

	constructor(public venue: Venue) {
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

