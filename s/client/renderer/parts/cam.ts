
import {degrees, Scalar} from "@benev/math"
import {Scene} from "@babylonjs/core/scene.js"
import {Vector3} from "@babylonjs/core/Maths/math.js"
import {ArcRotateCamera} from "@babylonjs/core/Cameras/arcRotateCamera.js"

import {resolveGridspace} from "../utils/resolve.js"
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"
import {GameComponents} from "../../../lib/game/parts/components.js"
import {defaultCamSettings} from "../../../lib/game/utils/default-cam.js"

type Settings = GameComponents["cam"]

export class Cam {
	#camera
	#swivelOffset = degrees(-90)
	#anchorHeight = 0.5

	#state = {
		focal: new Gridspace(),
		zoom: new Scalar(),
		tilt: new Scalar(),
		swivel: new Scalar(),
		fov: new Scalar(),
	}

	constructor(scene: Scene, settings = defaultCamSettings()) {
		this.#camera = new ArcRotateCamera(
			"camera",
			this.#swivelOffset + settings.swivel, // swivel
			settings.tilt, // verticality
			settings.zoom,
			new Vector3(...resolveGridspace(new Gridspace().from(settings.focal)), this.#anchorHeight),
			scene,
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

		state.focal.lerp(new Gridspace().from(settings.focal), lerp)
		state.zoom.lerp(settings.zoom, lerp)
		state.tilt.lerp(settings.tilt, lerp)
		state.swivel.lerp(settings.swivel, lerp)
		state.fov.lerp(settings.fov, lerp)

		c.target.copyFrom(new Vector3(...resolveGridspace(state.focal, this.#anchorHeight)))
		c.alpha = this.#swivelOffset + state.swivel.x
		c.beta = state.tilt.x
		c.radius = state.zoom.x
		c.fov = state.fov.x
	}
}

