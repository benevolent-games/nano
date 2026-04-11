
import {makeId} from "@benev/archimedes"
import {Scene} from "@babylonjs/core/scene.js"
import {MeshBuilder} from "@babylonjs/core/Meshes/meshBuilder.js"
import {Color3, Color4, Vector3} from "@babylonjs/core/Maths/math.js"
import {PBRMaterial} from "@babylonjs/core/Materials/PBR/pbrMaterial.js"
import {ArcRotateCamera} from "@babylonjs/core/Cameras/arcRotateCamera.js"
import {HemisphericLight} from "@babylonjs/core/Lights/hemisphericLight.js"
import {setOpenGLOrientationForUV} from "@babylonjs/core/Compat/compatibilityOptions.js"

import {AnyEngine} from "./types.js"
import {makeEngine} from "./make-engine.js"
import {resolveGridspace} from "../utils/units.js"
import {Gridspace} from "../../../lib/game/parts/units.js"

export class Realm {
	static async new() {
		const canvas = new OffscreenCanvas(120, 60)
		const engine = await makeEngine({
			canvas,
			webgl: {}, // enabled
			webgpu: {}, // enabled
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
		return new this(canvas, engine, scene)
	}

	camera
	#floorSource
	#wallSource
	#robotSource

	constructor(
			public canvas: OffscreenCanvas,
			public engine: AnyEngine,
			public scene: Scene,
		) {

		this.camera = new ArcRotateCamera(
			"camera",
			-Math.PI / 2,   // alpha
			0.15,           // beta -- near topdown, but not exactly 0
			90,             // radius / zoom distance
			resolveGridspace(new Gridspace(32, 32)),
			scene,
		)
		scene.activeCamera = this.camera

		const light = new HemisphericLight(makeId(), new Vector3(0, 1, 0), scene)
		light.intensity = 1.0

		const floorMat = new PBRMaterial(makeId(), scene)
		floorMat.albedoColor = new Color3(0.02, 0.04, 0.08)
		floorMat.roughness = 1.0
		floorMat.metallic = 0.0

		const wallMat = new PBRMaterial(makeId(), scene)
		wallMat.albedoColor = new Color3(0.32, 0.34, 0.38)
		wallMat.roughness = 1.0
		wallMat.metallic = 0.0

		const robotMat = new PBRMaterial(makeId(), scene)
		robotMat.albedoColor = new Color3(0.8, 0.2, 0.2)
		robotMat.roughness = 1.0
		robotMat.metallic = 0.0

		const rsize = 0.8
		this.#robotSource = MeshBuilder.CreateBox(makeId(), {
			width: rsize,
			depth: rsize,
			height: rsize * 2,
		})
		this.#robotSource.material = robotMat
		this.#robotSource.isVisible = false

		const floorSource = MeshBuilder.CreateBox(makeId(), {
			width: 1,
			depth: 1,
			height: 1,
		}, scene)
		floorSource.material = floorMat
		floorSource.isVisible = false

		const wallSource = MeshBuilder.CreateBox(makeId(), {
			width: 1,
			depth: 1,
			height: 1,
		}, scene)
		wallSource.material = wallMat
		wallSource.isVisible = false

		this.#floorSource = floorSource
		this.#wallSource = wallSource
	}

	instanceFloor(gridspace: Gridspace) {
		const instance = this.#floorSource.createInstance(makeId())
		instance.position = resolveGridspace(gridspace)
		return instance
	}

	instanceWall(gridspace: Gridspace) {
		const instance = this.#wallSource.createInstance(makeId())
		instance.position = resolveGridspace(gridspace, 1)
		return instance
	}

	instanceRobot(gridspace: Gridspace) {
		const instance = this.#robotSource.createInstance(makeId())
		instance.position = resolveGridspace(gridspace, 1)
		return instance
	}

	dispose() {
		this.scene.dispose()
	}
}

