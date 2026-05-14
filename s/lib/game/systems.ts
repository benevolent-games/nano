
import {consolidate} from "@benev/archimedes"

import {Pod} from "./parts/pod.js"
import {pickups} from "./systems/pickups.js"
import {timing_update} from "./systems/timing_update.js"
import {robot_spawning} from "./systems/robot_spawning.js"
import {physics_bodies} from "./systems/physics_bodies.js"
import {physical_forces} from "./systems/physical_forces.js"
import {hologrid_chunks} from "./systems/hologrid_chunks.js"
import {resolve_velocity} from "./systems/resolve_velocity.js"
import {gridchunk_physics} from "./systems/gridchunk_physics.js"
import {target_lattice, targeting} from "./systems/targeting.js"
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
		robot_spawning,
		control_movements_and_rotations,
	},

	gameplay: {
		target_lattice,
		targeting,
		pickups,
	},

	physics: {
		gridchunk_physics,
		physics_bodies,
		resolve_velocity,
		physical_forces,
	},
})

