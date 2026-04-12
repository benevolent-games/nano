
import {Vec2} from "@benev/math"

export const index2d = (extent: Vec2, vec: Vec2) => {
	return (vec.y * extent.x) + vec.x
}

