
import {degrees, Rect, Vec2, XyArray} from "@benev/math"
import {Gridspace} from "../../gridworld/utils/gridspace.js"


export function selrect(components: {
		position: XyArray,
		reach: number,
		rotation: number,
	}) {

	const extent = Vec2.all(components.reach * 2)

	const center = new Gridspace()
		.from(components.position)
		.add(
			new Gridspace(components.reach, 0)
				.rotate(degrees(270) - components.rotation)
		)

	return Rect.fromCenter(center, extent)
}

