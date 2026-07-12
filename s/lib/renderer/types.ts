
import {EngineContext} from "@babylonjs/lite"
import {AssetDepot} from "../buddy/depot.js"
import {Art} from "../buddy/art/art.js"

export type ArtContext = {
	engine: EngineContext
	depot: AssetDepot
}

export type TeamArt = {

	/** neutral white */
	t0: Art

	/** blue team */
	t1: Art

	/** red team */
	t2: Art
}

