
import {Artwork} from "../buddy/artwork.js"
import {AssetDepot} from "../buddy/asset-depot.js"

export const artwork = Artwork.using<AssetDepot>()(art => ({
	gSquare: art(256, d => d.prop("g-square")),
	gFloor: art(256, d => d.prop("g-floor")),
	gWall: art(256, d => d.prop("g-wall")),
}))

