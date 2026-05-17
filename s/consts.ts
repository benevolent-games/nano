
import {deep} from "@e280/stz"
import {Vec2} from "@benev/math"

export const consts = deep.freeze({
	simulationHz: {min: 10, max: 30},
	interactorReach: 0.5,
	robotScale: 0.8,
	renderProximity: 30,
	map: {
		seed: 1,
		extent: Vec2.all(128),
	},
	assets: {
		art: "/assets/art-009.glb",
	},
})

