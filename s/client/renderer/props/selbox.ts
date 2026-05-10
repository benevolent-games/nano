
import {makeId} from "@benev/archimedes"
import {Scene} from "@babylonjs/core/scene.js"
import {MeshBuilder} from "@babylonjs/core/Meshes/meshBuilder.js"

import {consts} from "../../../consts.js"
import {quickMaterial} from "../parts/quick-material.js"

export function selbox(scene: Scene) {
	const height = 1.2
	const s = consts.interactorReach
	const box = MeshBuilder.CreateBox(makeId(), {width: s, depth: s, height}, scene)

	const material = quickMaterial(scene, 0.2, 0.8, 0.8)
	material.alpha = 0.1
	box.material = material

	return box
}

