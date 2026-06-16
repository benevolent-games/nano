
import {makeId} from "@benev/archimedes"
import {Scene} from "@babylonjs/core/scene.js"
import {Color4} from "@babylonjs/core/Maths/math.color.js"
import {Vector3} from "@babylonjs/core/Maths/math.vector.js"
import {HemisphericLight} from "@babylonjs/core/Lights/hemisphericLight.js"
import {setOpenGLOrientationForUV} from "@babylonjs/core/Compat/compatibilityOptions.js"

import {Cam} from "./cam.js"
import {AnyCanvas} from "../../../lib/buddy/buddy.js"
import {makeEngine} from "./make-engine.js"

export type Venue = Awaited<ReturnType<typeof makeVenue>>

export async function makeVenue(canvas: AnyCanvas) {
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

	const cam = new Cam(scene)
	scene.activeCamera = cam.camera

	return {engine, scene, light, cam}
}

