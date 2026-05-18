
import {Quat, Vec3} from "@benev/math"
import {guarantee, need} from "@e280/stz"
import {Quaternion} from "@babylonjs/core/Maths/math.js"

import {Pool} from "../../client/renderer/parts/pool.js"
import {instantiate, Prop} from "../../client/renderer/parts/buddy.js"

export class Art {
	constructor(
		public readonly name: string,
		public readonly prepopulation: number,
	) {}
}

export class BabylonStage {
	#props: Prop[] = []
	#binds = new Map<Figure, [Prop, () => void]>()
	#pools = new Map<Art, Pool<Prop>>()

	constructor(
		public figures: Figures,
		private source: Map<string, Prop>,
	) {}

	#getPool(art: Art) {
		return guarantee(this.#pools, art, () => new Pool<Prop>(() => {
			const instance = instantiate(need(this.source, art.name))
			this.#props.push(instance)
			return {
				item: instance,
				enable: () => instance.setEnabled(true),
				disable: () => instance.setEnabled(false),
			}
		}).prepopulate(art.prepopulation))
	}

	render() {

		// create and/or update figure props
		for (const figure of this.figures.all()) {
			const [prop] = guarantee(this.#binds, figure, () => this.#getPool(figure.art).lease())
			if (prop.isEnabled() !== figure.visible)
				prop.setEnabled(figure.visible)
			if (figure.visible) {
				prop.scaling.set(figure.scale.x, figure.scale.y, figure.scale.z)
				prop.position.set(figure.position.x, figure.position.y, figure.position.z)
				prop.rotationQuaternion ??= Quaternion.Identity()
				const {x, y, z, w} = figure.rotation
				prop.rotationQuaternion.set(x, y, z, w)
			}
		}

		// release all figures not in use
		for (const [figure, [,release]] of this.#binds) {
			if (!this.figures.has(figure)) {
				release()
				this.#binds.delete(figure)
			}
		}
	}

	dispose() {
		for (const prop of this.#props)
			prop.dispose()
	}
}

export class Figure {
	visible = true
	scale = new Vec3(1, 1, 1)
	position = new Vec3()
	rotation = new Quat()
	constructor(public readonly art: Art) {}
}

export class Figures {
	#figures = new Set<Figure>()

	all() {
		return this.#figures.values()
	}

	has(figure: Figure) {
		return this.#figures.has(figure)
	}

	make(art: Art) {
		const figure = new Figure(art)
		this.#figures.add(figure)
		const dispose = () => this.#figures.delete(figure)
		return [figure, dispose] as [figure: Figure, dispose: () => void]
	}
}

export const artwork = {
	indicator: new Art("indicator", 1),
	phasebox: new Art("phasebox", 1),
	phaseboxAngry: new Art("phasebox-angry", 1),
	projectileBeam: new Art("projectile-beam", 32),
	projectilePulse: new Art("projectile-pulse", 32),
	lowerTrike: new Art("lower-trike", 16),
	lowerQuadcar: new Art("lower-quadcar", 16),
	lowerTreads: new Art("lower-treads", 16),
	upperScout: new Art("upper-scout", 16),
	upperPragmatist: new Art("upper-pragmatist", 16),
	upperUtilitarian: new Art("upper-utilitarian", 16),
	upperChonky: new Art("upper-chonky", 16),
}

