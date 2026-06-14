
import {Rect, Vec2, XyArray} from "@benev/math"

export function getRect(components: {position: XyArray, size: XyArray}) {
	return Rect.fromCenter(
		Vec2.from(components.position),
		Vec2.from(components.size),
	)
}

