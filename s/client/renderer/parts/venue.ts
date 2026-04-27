
import {makeId} from "@benev/archimedes"
import {Scene} from "@babylonjs/core/scene.js"
import {Color4} from "@babylonjs/core/Maths/math.color.js"
import {Vector3} from "@babylonjs/core/Maths/math.vector.js"
import {ArcRotateCamera} from "@babylonjs/core/Cameras/arcRotateCamera.js"
import {HemisphericLight} from "@babylonjs/core/Lights/hemisphericLight.js"
import {setOpenGLOrientationForUV} from "@babylonjs/core/Compat/compatibilityOptions.js"

import {makeEngine} from "./make-engine.js"
import {AnyCanvas, AnyEngine} from "./babtools.js"
import {resolveGridspace} from "../utils/resolve-gridspace.js"
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"

export type Venue = {
	canvas: AnyCanvas
	engine: AnyEngine
	scene: Scene
	camera: ArcRotateCamera
	light: HemisphericLight
}

export async function makeVenue(canvas: AnyCanvas): Promise<Venue> {
	const engine = await makeEngine({
		canvas,
		webgl: {},
		// webgpu: {},
	})

	const scene = new Scene(engine, {
		useClonedMeshMap: true,
		useMaterialMeshMap: true,
		useGeometryUniqueIdsMap: true,
	})

	setOpenGLOrientationForUV(true)
	scene.doNotHandleCursors = true
	scene.clearColor = new Color4(0, 0, 0, 1)
	scene.useRightHandedSystem = true

	const light = new HemisphericLight(makeId(), new Vector3(0, 1, 0), scene)
	light.intensity = 1.0

	const camera = new ArcRotateCamera(
		"camera",
		-Math.PI / 2,   // alpha
		0.15,           // beta -- near topdown, but not exactly 0
		90,             // radius / zoom distance
		resolveGridspace(new Gridspace(32, 32)),
		scene,
	)

	scene.activeCamera = camera

	return {canvas, engine, scene, light, camera}
}

