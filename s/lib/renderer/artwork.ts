
import {ArtContext} from "./types.js"
import {Artwork} from "../buddy/artsy/artwork.js"

export const artwork = Artwork.using<ArtContext>()(art => ({
	gSquare: art(256, c => c.depot.prop("g-square")),
	gFloor: art(256, c => c.depot.prop("g-floor")),
	gWall: art(256, c => c.depot.prop("g-wall")),
	gRubble: art(256, c => c.depot.prop("g-rubble")),

	pylon: {
		neutral: art(64, c => c.depot.prop("pylon")),
		t1: art(64, c => c.depot.prop("pylon-t1")),
		t2: art(64, c => c.depot.prop("pylon-t2")),
	},
}))

