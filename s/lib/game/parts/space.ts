
import {Actions} from "@benev/tact/core"
import {Lattice, Vec2} from "@benev/math"
import {EntitiesReadonly} from "@benev/archimedes"

import {Phys} from "../utils/phys.js"
import {Timing} from "../utils/timing.js"
import {GameBindings} from "./bindings.js"
import {GameComponents} from "./components.js"
import {Physics} from "../../physics/physics.js"

export class Space {
	timing = new Timing()
	physics = new Physics()
	physLattice = new Lattice<Phys>(new Vec2(8, 8))

	constructor(
		public entities: EntitiesReadonly<GameComponents>,
		public actions: Actions<GameBindings>,
	) {}
}

