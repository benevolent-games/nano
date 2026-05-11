
import {Xy} from "@benev/math"

export const index2d = (extent: Xy, vec: Xy) => {
	return (vec.y * extent.x) + vec.x
}

