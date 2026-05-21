
import {consolidate} from "@benev/archimedes"

import {Pod} from "./parts/pod.js"
import {drops} from "./systems/drops.js"
import {equips} from "./systems/equips.js"
import {pickups} from "./systems/pickups.js"
import {targeting} from "./systems/targeting.js"
import {mech_aiming} from "./systems/mech_aiming.js"
import {mech_mobility} from "./systems/mech_mobility.js"
import {timing_update} from "./systems/timing_update.js"
import {target_lattice} from "./systems/target_lattice.js"
import {player_spawning} from "./systems/player_spawning.js"
import {physics_bodies} from "./systems/physics_bodies.js"
import {mech_inventory} from "./systems/mech_inventory.js"
import {physical_forces} from "./systems/physical_forces.js"
import {hologrid_chunks} from "./systems/hologrid_chunks.js"
import {gridchunk_physics} from "./systems/gridchunk_physics.js"
import {hologrid_lifecycle} from "./systems/hologrid_lifecycle.js"
import {ingest_player_intents} from "./systems/ingest_player_intents.js"
import {control_movements_and_rotations} from "./systems/control_movements_and_rotations.js"

export const systems = (pod: Pod) => consolidate(pod, {
	clock: {
		timing_update,
	},

	gridworld: {
		hologrid_lifecycle,
		hologrid_chunks,
	},

	user_inputs: {
		ingest_player_intents,
	},

	controls: {
		player_spawning,
		control_movements_and_rotations,
	},

	mech: {
		mech_mobility,
		mech_aiming,
		mech_inventory,
	},

	gameplay: {
		target_lattice,
		targeting,
		pickups,
		equips,
		drops,
	},

	physics: {
		gridchunk_physics,
		physics_bodies,
		physical_forces,
	},
})

