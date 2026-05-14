
import {Select} from "@benev/archimedes"
import {Circular, Scalar, Vec2} from "@benev/math"
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"
import {GameComponents} from "../../../lib/game/parts/components.js"

type Comps = Select<GameComponents, "position" | "rotation" | "lerp">

export class Robolocation {
	position
	rotation

	constructor(components: Comps) {
		this.position = new Gridspace(...components.position)
		this.rotation = new Circular(components.rotation)
	}

	update(delta: number, components: Comps) {
		const factor = Scalar.clamp(
			1 - Math.pow(1 - components.lerp, delta / 16.6667),
			0,
			1,
		)
		this.position.add(
			Vec2.from(components.position)
				.sub(this.position)
				.mulBy(factor)
		)
		this.rotation.lerp(components.rotation, components.lerp ?? 1)
	}
}

