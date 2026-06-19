//
// import {Quat, Vec3} from "@benev/math"
// import {got, guarantee} from "@e280/stz"
// import {Pool} from "../buddy2/pool.js"
//
// // TODO
// export type Prop = any
//
// /** identifier for a piece of artwork recognized by the game */
// export type PropId = symbol
//
// /** describes a single graphical instance of a piece of art */
// export class Graphic {
// 	visible = true
// 	scale = new Vec3(1, 1, 1)
// 	position = new Vec3()
// 	rotation = new Quat()
// 	constructor(public readonly propId: PropId) {}
// }
//
// /** replicates graphics into a babylon scene, with efficient instance pooling */
// export class Replicator {
// 	#instances: Prop[] = []
// 	#pools = new Map<PropId, Pool<Prop>>()
// 	#binds = new Map<Graphic, [instance: Prop, release: () => void]>()
//
// 	constructor(
// 		public graphics: Set<Graphic>,
// 		public readonly props: Map<PropId, Prop>,
// 	) {}
//
// 	preload(propId: PropId, prepopulation: number) {
// 		this.#getPool(propId).prepopulate(prepopulation)
// 	}
//
// 	render() {
// 		// create and/or update props for graphics
// 		for (const graphic of this.graphics) {
// 			const [prop] = guarantee(this.#binds, graphic, () => this.#getPool(graphic.propId).lease())
// 			applyGraphic(graphic, prop)
// 		}
//
// 		// release all graphics not in use
// 		for (const [graphic, [,release]] of this.#binds) {
// 			if (!this.graphics.has(graphic)) {
// 				release()
// 				this.#binds.delete(graphic)
// 			}
// 		}
// 	}
//
// 	dispose() {
// 		for (const instances of this.#instances)
// 			instances.dispose()
// 	}
//
// 	#getPool(propId: PropId) {
// 		return guarantee(this.#pools, propId, () => new Pool<Prop>(() => {
// 			const instance = instantiate(got(this.props.get(propId)))
// 			this.#instances.push(instance)
// 			return {
// 				item: instance,
// 				enable: () => instance.setEnabled(true),
// 				disable: () => instance.setEnabled(false),
// 			}
// 		}))
// 	}
// }
//
