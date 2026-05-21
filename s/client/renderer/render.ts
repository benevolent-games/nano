
import {consolidate} from "@benev/archimedes"
import {Realm} from "./realm.js"
import {update_cam} from "./systems/update_cam.js"
import {update_timing} from "./systems/update_timing.js"
import {render_robots} from "./systems/render_robots.js"
import {render_selboxes} from "./systems/render_selboxes.js"
import {render_gridchunks} from "./systems/render_gridchunks.js"
// import {render_pickupables} from "./systems/render_pickupables.js"
import {render_target_indicators} from "./systems/render_target_indicators.js"

export const setupRender = (realm: Realm) => consolidate(realm, {
	timing: {
		update_timing,
	},

	cam: {
		update_cam,
	},

	graphics: {
		render_gridchunks,
		render_robots,
		// render_pickupables,
		render_target_indicators,
		render_artist: realm => () => realm.artist.render(),
	},

	debug: {
		render_selboxes,
	},
})

