
import {XyArray} from "@benev/math"
import {Change, Id} from "@benev/archimedes"

import {GameComponents} from "../parts/components.js"
import {defaultCamSettings} from "../utils/default-cam.js"
import { archetype } from "../utils/archetype.js"

export function spawnMech(
		change: Change<GameComponents>,
		{controlledBy, position}: {controlledBy: Id, position: XyArray},
	) {

	const mech = archetype({
		// debug: true,
		controlledBy,
		position,
		cam: defaultCamSettings(),
		wishMove: [0, 0],
		wishAim: [1, 0],
		rotation: 0,
		physical: true,
		size: [0.6, 0.6],
		mass: 1,
		lerp: 0.4,
		velocity: [0, 0],
		sprint: false,
		target: null,
		reach: 1,
		inventory: {
			capacity: 25,
			items: [],
		},
		mech: {
			lower: lowerHover(),
			upper: upperScout(),
		},
		lowerRotation: 0,
		engineSpeed: 0,
		equipment: {
			alpha: null,
			bravo: null,
		},
	})

	const mechId = change.create(mech)

	// TODO spawn and attach equipment?

	return {mechId}
}

