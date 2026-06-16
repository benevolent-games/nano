
import {consolidate} from "@benev/archimedes"
import {Realm} from "./realm.js"

export const setupRender = (realm: Realm) => consolidate(realm, {
	// timing: {
	// 	update_timing,
	// },
	//
	// cam: {
	// 	update_cam,
	// },
	//
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
