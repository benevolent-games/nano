
import {dedupe} from "@e280/stz"
import {AssetContainer} from "@babylonjs/lite"
import {Prop} from "./types.js"
import {flatten} from "./internal/flatten.js"
import {isLight, isMesh, isTransform} from "./discriminate.js"

export function analyze(assets: AssetContainer) {
	const flat = flatten(assets.entities)
	const lights = flat.filter(isLight)
	const meshes = flat.filter(isMesh)
	const transforms = flat.filter(isTransform)
	const materials = dedupe(meshes.map(m => m.material))
	const props = new Map<string, Prop>([...transforms, ...meshes].map(n => [n.name, n]))
	return {flat, lights, meshes, transforms, materials, props}
}

