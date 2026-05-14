
import {Vec2, XyArray} from "@benev/math"

export function boxify(components: {size?: XyArray, radius?: number}) {
	if (components.size !== undefined)
		return Vec2.from(components.size)
	else if (components.radius !== undefined)
		return Vec2.all(components.radius * 2)
	else
		return null
}

