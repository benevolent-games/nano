
import {consolidate} from "@benev/archimedes"

import {Pod} from "./parts/pod.js"
import {update_timing} from "./systems/update_timing.js"
import {robot_spawning} from "./systems/robot_spawning.js"
import {physics_bodies} from "./systems/physics_bodies.js"
import {physical_forces} from "./systems/physical_forces.js"
import {update_gridworld} from "./systems/update_gridworld.js"
import {resolve_velocity} from "./systems/resolve_velocity.js"
import {gridchunk_physics} from "./systems/gridchunk_physics.js"
import {ingest_player_intents} from "./systems/ingest_player_intents.js"
import {control_movements_and_rotations} from "./systems/control_movements_and_rotations.js"

export const systems = (pod: Pod) => consolidate(pod, {
	timing: {
		update_timing,
	},

	gridworld: {
		update_gridworld,
	},

	user_inputs: {
		ingest_player_intents,
	},

	controls: {
		robot_spawning,
		control_movements_and_rotations,
	},

	physics: {
		gridchunk_physics,
		physics_bodies,
		resolve_velocity,
		physical_forces,
	},
})

