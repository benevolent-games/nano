
import {deep} from "@e280/stz"
import {Vec2} from "@benev/math"

export const consts = deep.freeze({
	simulationHz: {min: 10, max: 30},
	interactorReach: 0.5,
	map: {
		seed: 1,
		extent: Vec2.all(128),
	},
	assets: {
		art: "/assets/art-001.glb",
	},
})

