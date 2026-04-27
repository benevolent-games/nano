
import {Actions} from "@benev/tact/core"
import {Lattice, Vec2} from "@benev/math"
import {EntitiesReadonly} from "@benev/archimedes"

import {Phys} from "../utils/phys.js"
import {consts} from "../../../consts.js"
import {GameBindings} from "./bindings.js"
import {Timing} from "../../tools/timing.js"
import {GameComponents} from "./components.js"
import {Physics} from "../../physics/physics.js"

export class Space {
	timing = new Timing(consts.simulationHz.min, consts.simulationHz.max)
	physics = new Physics()
	physLattice = new Lattice<Phys>(new Vec2(8, 8))

	constructor(
		public entities: EntitiesReadonly<GameComponents>,
		public actions: Actions<GameBindings>,
	) {}
}

