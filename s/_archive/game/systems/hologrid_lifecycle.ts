
import {Vec2} from "@benev/math"
import {lifecycle} from "@benev/archimedes"

import {Pod} from "../parts/pod.js"
import {Hologrid} from "../utils/hologrid.js"

export const hologrid_lifecycle = (pod: Pod) => lifecycle(
	pod.entities,
	["gridworld"],
	(_id, components) => {
		if (pod.hologrid)
			throw new Error("cannot spawn more than one hologrid")

		const extent = Vec2.from(components.gridworld.extent)
		pod.hologrid = new Hologrid(extent)

		return {
			tick: () => {},
			exit: () => {
				pod.hologrid = undefined
			},
		}
	},
)

