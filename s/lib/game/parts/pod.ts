
import {Lattice, Vec2} from "@benev/math"
import {Change, EntitiesReadonly} from "@benev/archimedes"

import {Phys} from "../utils/phys.js"
import {consts} from "../../../consts.js"
import {ActorMap} from "../utils/actor.js"
import {Timing} from "../../tools/timing.js"
import {Hologrid} from "../utils/hologrid.js"
import {GameComponents} from "./components.js"
import {Physics} from "../../physics/physics.js"
import {IntentBucketMap} from "../../../client/views/play/parts/recruiter.js"

export class Pod {
	timing = new Timing(consts.simulationHz.min, consts.simulationHz.max)
	physics = new Physics()
	physLattice = new Lattice<Phys>(new Vec2(8, 8))
	actors = new ActorMap()
	hologrid?: Hologrid

	constructor(
		public entities: EntitiesReadonly<GameComponents>,
		public change: Change<GameComponents>,
		public players: IntentBucketMap | null,
	) {}
}

