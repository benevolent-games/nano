
import {AnyCanvas} from "../../../lib/buddy2/types.js"
import {addToScene, createEngine, createHemisphericLight, createSceneContext} from "@babylonjs/lite"

export type Venue = Awaited<ReturnType<typeof makeVenue>>

export async function makeVenue(canvas: AnyCanvas) {
	const engine = await createEngine(canvas)
	const scene = createSceneContext(engine)
	const light = createHemisphericLight([0, 1, 0], 1)
	addToScene(scene, light)
	return {canvas, engine, scene, light}
}

