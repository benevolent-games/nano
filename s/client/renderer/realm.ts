
import {EntitiesReadonly} from "@benev/archimedes"
import {AssetContainer} from "@babylonjs/core/assetContainer.js"

import {art} from "../../lib/game/art.js"
import {Venue} from "./parts/venue.js"
import {Timing} from "../../lib/tools/timing.js"
import {Artist} from "../../lib/graphics/artist.js"
import {makePropMap} from "../../lib/buddy/buddy.js"
import {Graphics} from "../../lib/graphics/graphics.js"
import {PlayerId} from "../../lib/game/utils/players.js"
import {Gridspace} from "../../lib/gridworld/utils/gridspace.js"
import {GameComponents} from "../../lib/game/parts/components.js"
import {validateProps} from "../../lib/graphics/validate-props.js"

export class Realm {
	artist
	graphics = new Graphics()
	timing = new Timing(10, 240)
	readonly focal = new Gridspace()

	constructor(
			public entities: EntitiesReadonly<GameComponents>,
			public playerId: PlayerId,
			public venue: Venue,
			public assets: AssetContainer,
		) {
		const props = makePropMap(assets)
		validateProps(props, art)
		this.artist = new Artist(this.graphics, props)
		this.artist.preload(Object.values(art))
	}

	replaceAssets(assets: AssetContainer) {
		const props = makePropMap(assets)
		validateProps(props, art)
		this.artist.dispose()
		this.artist = new Artist(this.graphics, props)
		this.artist.preload(Object.values(art))
	}

	dispose() {
		this.venue.scene.dispose()
	}
}

