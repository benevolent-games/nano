
import {makeId} from "@benev/archimedes"
import {Scene} from "@babylonjs/core/scene.js"
import {Color3} from "@babylonjs/core/Maths/math.color.js"
import {PBRMaterial} from "@babylonjs/core/Materials/PBR/pbrMaterial.js"

export function quickMaterial(scene: Scene, r: number, g: number, b: number, a = 1) {
	const m = new PBRMaterial(makeId(), scene)
	m.albedoColor = new Color3(r, g, b)
	m.roughness = 1.0
	m.metallic = 0.0
	if (a !== 1) m.alpha = a
	return m
}

