
import {makeId} from "@benev/archimedes"
import {Mesh} from "@babylonjs/core/Meshes/mesh.js"
import {Engine} from "@babylonjs/core/Engines/engine.js"
import {WebGPUEngine} from "@babylonjs/core/Engines/webgpuEngine.js"
import {InstancedMesh} from "@babylonjs/core/Meshes/instancedMesh.js"
import {TransformNode} from "@babylonjs/core/Meshes/transformNode.js"

export type AnyEngine = Engine | WebGPUEngine
export type AnyCanvas = HTMLCanvasElement | OffscreenCanvas

export type Meshoid = Mesh | InstancedMesh
export type Prop = TransformNode | Meshoid

export function instantiate(prop: Prop) {
	return prop.instantiateHierarchy(
		undefined,
		undefined,
		(_source, clone) => {
			const id = makeId()
			clone.id = id
			clone.name = id
		},
	) as TransformNode
}

