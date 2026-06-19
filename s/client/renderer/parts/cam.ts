
import {degrees, Scalar, Vec2} from "@benev/math"
import {createArcRotateCamera} from "@babylonjs/lite"

import {resolveGridspace} from "../utils/resolve.js"
import {GameComponents} from "../../../lib/game/parts/components.js"
import {defaultCamSettings} from "../../../lib/game/utils/default-cam.js"

type Settings = GameComponents["cam"]

export class Cam {
	#camera
	#swivelOffset = degrees(-90)
	#anchorHeight = 0.5

	#state = {
		focal: new Vec2(),
		zoom: new Scalar(),
		tilt: new Scalar(),
		swivel: new Scalar(),
		fov: new Scalar(),
	}

	constructor(settings = defaultCamSettings()) {
		this.#camera = createArcRotateCamera(
			this.#swivelOffset + settings.swivel, // swivel
			settings.tilt, // verticality
			settings.zoom,
			resolveGridspace(Vec2.from(settings.focal), this.#anchorHeight),
		)
		this.#camera.fov = settings.fov
	}

	get camera() {
		return this.#camera
	}

	lerpTowards(settings: Settings) {
		const {lerp} = settings
		const c = this.#camera
		const state = this.#state

		state.focal.lerp(Vec2.from(settings.focal), lerp)
		state.zoom.lerp(settings.zoom, lerp)
		state.tilt.lerp(settings.tilt, lerp)
		state.swivel.lerp(settings.swivel, lerp)
		state.fov.lerp(settings.fov, lerp)

		c.target = resolveGridspace(state.focal, this.#anchorHeight)
		c.alpha = this.#swivelOffset + state.swivel.x
		c.beta = state.tilt.x
		c.radius = state.zoom.x
		c.fov = state.fov.x
	}
}

