
import {ev} from "@e280/stz"
import {Rect, Vec2} from "@benev/math"
import {EntitiesReadonly} from "@benev/archimedes"
import {AssetContainer} from "@babylonjs/core/assetContainer.js"

import {Cam} from "./parts/cam.js"
import {Venue} from "../../lib/buddy/venue.js"
import {Timing} from "../../lib/tools/timing.js"
import {PlayerId} from "../../lib/game/types.js"
import {GameComponents} from "../../lib/game/parts/components.js"

export class Realm {
	// artist
	// graphics = new Graphics()

	cam
	cursorRaw = new Vec2()
	cursor = new Vec2()
	viewrect = new Rect(Vec2.zero(), new Vec2(1, 1))
	timing = new Timing(10, 240)
	readonly focal = new Vec2()

	#stopPointerListening

	constructor(
			public canvas: HTMLCanvasElement,
			public entities: EntitiesReadonly<GameComponents>,
			public playerId: PlayerId,
			public venue: Venue,
			public assets: AssetContainer,
		) {

		this.cam = new Cam(venue.scene)
		venue.scene.activeCamera = this.cam.camera

		this.#stopPointerListening = ev(canvas, {
			pointermove: ({clientX, clientY}: PointerEvent) => {
				const {width, height} = canvas.getBoundingClientRect()
				this.cursorRaw.x = clientX / width
				this.cursorRaw.y = clientY / height
			},
		})

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
		this.#stopPointerListening()
	}
}

