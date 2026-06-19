
import {Entity, Prop} from "./types.js"
import {byName} from "./internal/by-name.js"
import {flatten} from "./internal/flatten.js"
import {isLight, isMesh, isTransform} from "./discriminate.js"

export function analyze(entities: Entity[]) {
	const flat = flatten(entities)
	const lights = flat.filter(isLight)
	const meshes = byName(flat.filter(isMesh))
	const transforms = byName(flat.filter(isTransform))
	const props = byName<Prop>([...transforms.values(), ...meshes.values()])
	return {flat, lights, meshes, transforms, props}
}

