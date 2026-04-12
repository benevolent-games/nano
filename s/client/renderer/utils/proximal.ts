
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"

export class Proximal {
	#was = false
	#focal
	#threshold

	nearby = false

	constructor(focal: Gridspace, distance: number) {
		this.#focal = focal
		this.#threshold = distance ** 2
	}

	check(target: Gridspace) {
		this.nearby = target.distanceSquared(this.#focal) < this.#threshold
		const changed = this.nearby !== this.#was
		this.#was = this.nearby
		return changed
	}
}

