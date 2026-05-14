
import {degrees} from "@benev/math"
import {makeId} from "@benev/archimedes"
import {Scene} from "@babylonjs/core/scene.js"
import {MeshBuilder} from "@babylonjs/core/Meshes/meshBuilder.js"
import {TransformNode} from "@babylonjs/core/Meshes/transformNode.js"

import {quickMaterial} from "../parts/quick-material.js"
import {makeRobot} from "../../../lib/game/archetypes/robot.js"

export function robot(scene: Scene) {
	const components = makeRobot()
	const diameter = components.size[0]
	const radius = diameter / 2
	const height = 1.1

	const chassis = MeshBuilder.CreateCylinder(makeId(), {diameter, height}, scene)
	const nose = MeshBuilder.CreateBox(makeId(), {width: radius, depth: radius, height}, scene)
	nose.position.z += radius * Math.SQRT1_2
	nose.rotation.y = degrees(45)

	const material = quickMaterial(scene, 0.8, 0.2, 0.2)
	chassis.material = material
	nose.material = material

	const node = new TransformNode(makeId(), scene)
	chassis.setParent(node)
	nose.setParent(node)

	return node
}

