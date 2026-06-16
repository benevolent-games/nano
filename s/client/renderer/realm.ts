
import {Vec2} from "@benev/math"
import {EntitiesReadonly} from "@benev/archimedes"
import {AssetContainer} from "@babylonjs/core/assetContainer.js"

import {Venue} from "./parts/venue.js"
import {Timing} from "../../lib/tools/timing.js"
import {PlayerId} from "../../lib/game2/types.js"
import {GameComponents} from "../../lib/game2/parts/components.js"

export class Realm {
	// artist
	// graphics = new Graphics()
	timing = new Timing(10, 240)
	readonly focal = new Vec2()

	constructor(
			public entities: EntitiesReadonly<GameComponents>,
			public playerId: PlayerId,
			public venue: Venue,
			public assets: AssetContainer,
		) {
		// const props = makePropMap(assets)
		// validateProps(props, art)
		// this.artist = new Artist(this.graphics, props)
		// this.artist.preload(Object.values(art))
	}

	replaceAssets(assets: AssetContainer) {
		// const props = makePropMap(assets)
		// validateProps(props, art)
		// this.artist.dispose()
		// this.artist = new Artist(this.graphics, props)
		// this.artist.preload(Object.values(art))
	}

	dispose() {
		this.venue.scene.dispose()
	}
}

