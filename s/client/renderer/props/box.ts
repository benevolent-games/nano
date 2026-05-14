
import {Vec3} from "@benev/math"
import {makeId} from "@benev/archimedes"
import {Scene} from "@babylonjs/core/scene.js"
import {MeshBuilder} from "@babylonjs/core/Meshes/meshBuilder.js"

import {quickMaterial} from "../parts/quick-material.js"

export function box(scene: Scene, options: {color?: Vec3, scale?: Vec3} = {}) {
	const {x, y, z} = options.scale ?? Vec3.all(1)
	const box = MeshBuilder.CreateBox(makeId(), {width: x, depth: z, height: y}, scene)
	const color = options.color ?? Vec3.all(0.5)
	const material = quickMaterial(scene, ...color.array())
	box.material = material
	return box
}

