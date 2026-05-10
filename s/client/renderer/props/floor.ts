
import {makeId} from "@benev/archimedes"
import {Scene} from "@babylonjs/core/scene.js"
import {MeshBuilder} from "@babylonjs/core/Meshes/meshBuilder.js"
import {quickMaterial} from "../parts/quick-material.js"

export function floor(scene: Scene) {
	const s = 0.9
	const mesh = MeshBuilder.CreateBox(makeId(), {width: s, depth: s, height: s}, scene)
	mesh.material = quickMaterial(scene, 0.02, 0.04, 0.08)
	return mesh
}

