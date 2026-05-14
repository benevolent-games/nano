
import {Vec2, Xy} from "@benev/math"

export const index2d = (extent: Xy, vec: Xy) => {
	return (vec.y * extent.x) + vec.x
}

export const unindex2d = (extent: Xy, index: number) => {
	const x = index % extent.x
	const y = Math.floor(index / extent.x)
	return new Vec2(x, y)
}

