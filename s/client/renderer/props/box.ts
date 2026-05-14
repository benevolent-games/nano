
import {Vec3} from "@benev/math"
import {makeId} from "@benev/archimedes"
import {Scene} from "@babylonjs/core/scene.js"
import {MeshBuilder} from "@babylonjs/core/Meshes/meshBuilder.js"

import {quickMaterial} from "../parts/quick-material.js"

export function box(scene: Scene, color: Vec3) {
	const box = MeshBuilder.CreateBox(makeId(), {width: 1, depth: 1, height: 1}, scene)
	const material = quickMaterial(scene, ...color.array())
	box.material = material
	return box
}

