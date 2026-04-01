
import {AsComponents, change, World} from "@benev/archimedes"

export type EcsComponents = AsComponents<{
	health: number
	bleed: number
}>

export type EcsWorld = World<EcsComponents>

export const makeEcsSystems = (world: EcsWorld) => [
	function* bleeding() {
		for (const [id, components] of world.select("health", "bleed")) {
			if (components.bleed !== 0) {
				const health = components.health - components.bleed
				yield change.update(id, {...components, health})
			}
		}
	},

	function* death() {
		for (const [id, components] of world.select("health")) {
			if (components.health <= 0)
				yield change.del(id)
		}
	},
]

