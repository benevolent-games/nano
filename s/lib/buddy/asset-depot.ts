
import {dedupe, got} from "@e280/stz"
import {AssetContainer} from "@babylonjs/lite"
import {Prop} from "./types.js"
import {flatten} from "./internal/flatten.js"
import {isLight, isMesh, isTransform} from "./discriminate.js"

export class AssetDepot {
	flat
	lights
	meshes
	transforms
	materials
	props

	constructor(public assets: AssetContainer) {
		this.flat = flatten(assets.entities)
		this.lights = this.flat.filter(isLight)
		this.meshes = this.flat.filter(isMesh)
		this.transforms = this.flat.filter(isTransform)
		this.materials = dedupe(this.meshes.map(m => m.material))
		this.props = new Map<string, Prop>(
			[...this.transforms, ...this.meshes]
				.map(n => [n.name, n])
		)
	}

	prop(name: string) {
		return got(this.props.get(name))
	}

	mesh(name: string) {
		return got(this.meshes.find(n => n.name === name))
	}

	transform(name: string) {
		return got(this.transforms.find(n => n.name === name))
	}

	material(name: string) {
		return got(this.materials.find(n => n.name === name))
	}
}

