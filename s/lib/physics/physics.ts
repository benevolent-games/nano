
import {GMap} from "@e280/stz"
import {Id} from "@benev/archimedes"
import {Lattice, Rect, Vec2} from "@benev/math"
import {PhysicsBody} from "./physics-body.js"

export class Physics {
	#registry = new GMap<Id, PhysicsBody>()
	#lattice = new Lattice<PhysicsBody>(new Vec2(8, 8))

	upsert(id: Id, rect: Rect, mass: number | undefined) {
		const body = this.#registry.guarantee(id, () => {
			const body = new PhysicsBody(id, rect, mass)
			this.#lattice.upsert(body, rect)
			return body
		})

		body.mass = mass

		if (!body.rect.equals(rect)) {
			body.rect = rect
			this.#lattice.upsert(body, rect)
		}

		return body
	}

	requireBody(id: Id) {
		return this.#registry.need(id)
	}
}

