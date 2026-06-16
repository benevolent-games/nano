
import {need, Rand, seed} from "@e280/stz"
import {Lattice, Vec2} from "@benev/math"
import {Change, EntitiesReadonly, Id} from "@benev/archimedes"

import {Phys} from "../utils/phys.js"
import {consts} from "../../../consts.js"
import {ActorMap} from "../utils/actor.js"
import {Timing} from "../../../lib/tools/timing.js"
import {Hologrid} from "../utils/hologrid.js"
import {GameComponents} from "./components.js"
import {Physics} from "../../../lib/physics/physics.js"
import {IntentBucketMap} from "../../../client/views/play/parts/recruiter.js"

export class Pod {
	timing = new Timing(consts.simulationHz.min, consts.simulationHz.max)
	physics = new Physics()
	physLattice = new Lattice<Phys>(new Vec2(8, 8))
	targetLattice = new Lattice<Id>(new Vec2(8, 8))
	actors = new ActorMap()
	hologrid?: Hologrid
	rand = new Rand(seed(1))

	constructor(
		public entities: EntitiesReadonly<GameComponents>,
		public change: Change<GameComponents>,
		public players: IntentBucketMap | null,
	) {}

	getActions(playerId: string) {
		return need(this.actors, playerId).actions
	}
}

