import {makeId} from "@benev/archimedes"
import {Scene} from "@babylonjs/core/scene.js"
import {MeshBuilder} from "@babylonjs/core/Meshes/meshBuilder.js"
import {quickMaterial} from "../parts/quick-material.js"

export function robot(scene: Scene) {
	const s = 1.2
	const mesh = MeshBuilder.CreateBox(makeId(), {width: s, depth: s, height: s}, scene)
	mesh.material = quickMaterial(scene, 0.8, 0.2, 0.2)
	return mesh
}

