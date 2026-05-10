
import {degrees} from "@benev/math"
import {Scene} from "@babylonjs/core/scene.js"
import {ArcRotateCamera} from "@babylonjs/core/Cameras/arcRotateCamera.js"

import {resolveGridspace} from "../utils/resolve-gridspace.js"
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"

export class Cam {
	#focal
	#camera
	#swivelCenter = degrees(-90)

	constructor(scene: Scene) {
		this.#focal = new Gridspace(32, 32)
		this.#camera = new ArcRotateCamera(
			"camera",
			this.#swivelCenter, // swivel
			degrees(10), // verticality
			8,
			resolveGridspace(this.#focal),
			scene,
		)
		this.#camera.fov = degrees(80)
	}

	get focal() {
		return this.#focal
	}

	set focal(gridspace: Gridspace) {
		this.#focal = gridspace
		this.#camera.target.copyFrom(resolveGridspace(gridspace))
	}

	get swivel() {
		return this.#camera.alpha - this.#swivelCenter
	}

	set swivel(radians: number) {
		this.#camera.alpha = this.#swivelCenter + radians
	}

	get zoom() {
		return this.#camera.radius
	}

	set zoom(radius: number) {
		this.#camera.radius = radius
	}

	get camera() {
		return this.#camera
	}
}

