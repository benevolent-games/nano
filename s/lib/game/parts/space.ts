
import {GMap} from "@e280/stz"
import {Intent} from "@benev/tact"
import {Lattice, Vec2} from "@benev/math"
import {EntitiesReadonly, Id} from "@benev/archimedes"

import {Phys} from "../utils/phys.js"
import {Actor} from "../utils/actor.js"
import {consts} from "../../../consts.js"
import {Timing} from "../../tools/timing.js"
import {GameComponents} from "./components.js"
import {Physics} from "../../physics/physics.js"

export class Space {
	timing = new Timing(consts.simulationHz.min, consts.simulationHz.max)
	physics = new Physics()
	physLattice = new Lattice<Phys>(new Vec2(8, 8))

	playerEntityIds = new GMap<string, Id>()
	actors = new GMap<Id, Actor>()

	constructor(
		public entities: EntitiesReadonly<GameComponents>,
		public getExogenousPlayerIntents: () => Map<string, Intent[]>,
	) {}
}

