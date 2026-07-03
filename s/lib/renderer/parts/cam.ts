
import {degrees, Vec2, lerp} from "@benev/math"
import {createArcRotateCamera} from "@babylonjs/lite"

import {resolveGridspace} from "../utils/resolve.js"
import {GameComponents} from "../../game/parts/components.js"
import {defaultCamSettings} from "../../game/utils/default-cam.js"

type Settings = GameComponents["cam"]

export class Cam {
	#camera
	#swivelOffset = degrees(-90)
	#anchorHeight = 0.5

	#state = {
		focal: new Vec2(),
		zoom: 0,
		tilt: 0,
		swivel: 0,
		fov: 0,
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

	lerpTowards(target: Settings) {
		const c = this.#camera
		const state = this.#state

		state.focal.lerp(target.lerp, Vec2.from(target.focal))
		state.zoom = lerp(target.lerp, state.zoom, target.zoom)
		state.tilt = lerp(target.lerp, state.tilt, target.tilt)
		state.swivel = lerp(target.lerp, state.swivel, target.swivel)
		state.fov = lerp(target.lerp, state.fov, target.fov)

		c.target = resolveGridspace(state.focal, this.#anchorHeight)
		c.alpha = this.#swivelOffset + state.swivel
		c.beta = state.tilt
		c.radius = state.zoom
		c.fov = state.fov
	}
}

