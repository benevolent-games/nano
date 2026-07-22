
import {ev} from "@e280/stz"
import {Rect, Vec2} from "@benev/math"
import {addToScene} from "@babylonjs/lite"
import {EntitiesReadonly} from "@benev/archimedes"

import {Cam} from "./parts/cam.js"
import {artwork} from "./artwork.js"
import {Venue} from "./parts/venue.js"
import {Timing} from "../tools/timing.js"
import {PlayerId} from "../game/types.js"
import {Figures} from "../buddy/art/figures.js"
import {Replicator} from "../buddy/replicator.js"
import {GameComponents} from "../game/parts/components.js"

export class Realm {
	venue
	entities
	playerId

	figures
	replicator

	cam
	cursorRaw = new Vec2()
	cursor = new Vec2()
	viewrect = new Rect(Vec2.zero(), new Vec2(1, 1))
	timing = new Timing(10, 240)
	readonly focal = new Vec2()

	#stopPointerListening

	constructor(options: {
			venue: Venue
			entities: EntitiesReadonly<GameComponents>
			playerId: PlayerId
		}) {

		const {canvas, scene, depot} = options.venue

		this.venue = options.venue
		this.entities = options.entities
		this.playerId = options.playerId
		
		this.figures = new Figures()
		this.replicator = new Replicator(artwork, depot, this.figures)

		this.cam = new Cam()
		addToScene(scene, this.cam.camera)
		scene.camera = this.cam.camera

		this.#stopPointerListening = ev(canvas, {
			pointermove: ({clientX, clientY}: PointerEvent) => {
				const {width, height} = canvas.getBoundingClientRect()
				this.cursorRaw.x = clientX / width
				this.cursorRaw.y = clientY / height
			},
		})
	}

	dispose() {
		this.#stopPointerListening()
	}
}

