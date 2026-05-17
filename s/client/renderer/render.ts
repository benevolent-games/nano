
import {consolidate} from "@benev/archimedes"
import {Realm} from "./parts/realm.js"
import {update_cam} from "./systems/update_cam.js"
import {update_timing} from "./systems/update_timing.js"
import {render_gridchunks} from "./systems/render_gridchunks.js"
import {render_pickupables} from "./systems/render_pickupables.js"

export const render = (realm: Realm) => consolidate(realm, {
	timing: {
		update_timing,
	},

	cam: {
		update_cam,
	},

	graphics: {
		render_gridchunks,
		// render_robots,
		// render_inventory_full,
		// render_selboxes,
		render_pickupables,
	},
})

