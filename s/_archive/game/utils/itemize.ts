
import {Rand} from "@e280/stz"
import {degrees, Vec2} from "@benev/math"
import {art} from "../art.js"
import {GameComponents} from "../parts/components.js"

export function itemize({rand, artkey, position}: {
		rand: Rand
		artkey: keyof typeof art,
		position: Vec2,
	}): Partial<GameComponents> {

	return {
		art: artkey,
		position: position.array(),
		rotation: rand.range(degrees(0), degrees(360)),
		scale: 1,
		size: [0.5, 0.5],
		targetable: true,
		pickupable: true,
	}
}

