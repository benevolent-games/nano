
import {Xyz} from "@benev/math"
import {Vector3} from "@babylonjs/core/Maths/math.vector.js"
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"

export function resolveGridspace({x, y}: Gridspace, z = 0) {
	return resolvePosition({x, y, z})
}

export function resolvePosition({x, y, z}: Xyz) {
	return new Vector3(-x, z, -y)
}

export function resolveScale({x, y, z}: Xyz) {
	return new Vector3(x, z, y)
}

