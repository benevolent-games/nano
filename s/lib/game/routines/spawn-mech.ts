
import {XyArray} from "@benev/math"
import {Change, Id} from "@benev/archimedes"

import {GameComponents} from "../parts/components.js"
import {defaultCamSettings} from "../utils/default-cam.js"
import { archetype } from "../utils/archetype.js"
import { lowerHover } from "../archetypes/mech-lowers.js"
import { upperScout } from "../archetypes/mech-upper.js"

export function spawnMech(
		change: Change<GameComponents>,
		{controlledBy, position}: {controlledBy: Id, position: XyArray},
	) {

	const lowerId = change.create({mechLower: lowerHover()})
	const upperId = change.create({mechUpper: upperScout()})

	const mech = archetype({
		// debug: true,
		controlledBy,
		position,
		cam: defaultCamSettings(),
		wishMover: {
			move: [0, 0],
			aim: [1, 0],
			sprint: false,
		},
		wishActions: {
			a1: false,
			a2: false,
			a3: false,
			a4: false,
		},
		wishInteractor: {
			pickup: false,
			drop: false,
			use: false,
			unequip: false,
		},
		rotation: 0,
		physical: true,
		size: [0.6, 0.6],
		mass: 1,
		lerp: 0.4,
		velocity: [0, 0],
		target: null,
		reach: 1,
		inventory: [],
		inventoryCapacity: 4,
		mech: {
			rpm: 0,
			chassisRotation: 0,
		},
		mechBuild: {
			lowerId,
			upperId,
			alphaIds: [],
			bravoIds: [],
		},
	})

	const mechId = change.create(mech)
	change.merge(lowerId, {containerId: mechId})
	change.merge(upperId, {containerId: mechId})

	return {mechId, lowerId, upperId}
}

