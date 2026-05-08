
import {makeId} from "@benev/archimedes"
import {Scene} from "@babylonjs/core/scene.js"
import {quickMaterial} from "../parts/quick-material.js"
import {makeRobot} from "../../../lib/game/archetypes/robot.js"
import {MeshBuilder} from "@babylonjs/core/Meshes/meshBuilder.js"

export function robot(scene: Scene) {
	const components = makeRobot()
	const s = components.radius * 2
	const height = 1.2
	const mesh = MeshBuilder.CreateBox(makeId(), {width: s, depth: s, height}, scene)
	mesh.material = quickMaterial(scene, 0.8, 0.2, 0.2)
	return mesh
}

