
import {is} from "@e280/stz"
import {Circle, Rect, Vec2, XyArray} from "@benev/math"

export function getShape(components: {
		position: XyArray
		size?: XyArray
		radius?: number
	}) {

	const position = Vec2.from(components.position)

	if (components.size) {
		const size = Vec2.from(components.size)
		return Rect.fromCenter(position, size)
	}

	if (is.happy(components.radius)) {
		return new Circle(position, components.radius)
	}

	return null
}

