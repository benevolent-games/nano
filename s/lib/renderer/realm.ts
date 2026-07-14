
import {ev} from "@e280/stz"
import {Rect, Vec2} from "@benev/math"
import {EntitiesReadonly} from "@benev/archimedes"
import {addToScene, AssetContainer, disposeScene} from "@babylonjs/lite"

import {Cam} from "./parts/cam.js"
import {artwork} from "./artwork.js"
import {Venue} from "./parts/venue.js"
import {Timing} from "../tools/timing.js"
import {PlayerId} from "../game/types.js"
import {AssetDepot} from "../buddy/depot.js"
import {Figures} from "../buddy/art/figures.js"
import {Replicator} from "../buddy/replicator.js"
import {GameComponents} from "../game/parts/components.js"

export class Realm {
	figures
	replicator

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

		const depot = new AssetDepot(assets)
		console.log(depot)

		this.figures = new Figures()
		this.replicator = new Replicator(artwork, depot, this.figures)

		this.cam = new Cam()
		addToScene(venue.scene, this.cam.camera)
		venue.scene.camera = this.cam.camera

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
		disposeScene(this.venue.scene)
		this.#stopPointerListening()
	}
}

