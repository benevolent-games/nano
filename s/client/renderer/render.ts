
import {consolidate} from "@benev/archimedes"
import {Realm} from "./realm.js"
import {cam_update} from "./systems/cam_update.js"
import {timing_update} from "./systems/timing_update.js"
import {cursor_update} from "./systems/cursor_update.js"
import {viewrect_update} from "./systems/viewrect_update.js"

export const setupRender = (realm: Realm) => consolidate(realm, {
	basics: {
		timing_update,
		cam_update,
		cursor_update,
		viewrect_update,
	},

	// graphics: {
	// 	render_gridchunks,
	// 	render_art,
	// 	render_robots,
	// 	render_target_indicators,
	// 	render_artist: realm => () => realm.artist.render(),
	// },
	//
	// debug: {
	// 	render_selboxes,
	// },
})

