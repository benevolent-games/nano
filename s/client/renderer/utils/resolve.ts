
import {Quat, Vec3, Xy, Xyz} from "@benev/math"
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"

export function resolveGridspace({x, y}: Gridspace, z = 0) {
	return resolvePosition({x, y, z})
}

export function resolvePosition({x, y, z = 0}: Xy & {z?: number}) {
	return new Vec3(-x, z, -y)
}

export function resolveScale({x, y, z}: Xyz) {
	return new Vec3(x, z, y)
}

export function resolveRotation(radians: number) {
	return Quat.rotate_(0, radians, 0)
}

