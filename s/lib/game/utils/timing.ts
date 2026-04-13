
export class Timing {
	#tick = 0
	#delta = 0
	#previous = performance.now()

	update() {
		this.#tick++
		const now = performance.now()
		this.#delta = now - this.#previous
		this.#previous = now
	}

	get delta() {
		return this.#delta
	}
}

