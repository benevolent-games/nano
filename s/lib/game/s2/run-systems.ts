
import {systems} from "./utils/systems.js"
import {update_timing} from "./fns/update_timing.js"
import {robot_spawning} from "./fns/robot_spawning.js"
import {physics_bodies} from "./fns/physics_bodies.js"
import {physical_forces} from "./fns/physical_forces.js"
import {update_gridworld} from "./fns/update_gridworld.js"
import {resolve_velocity} from "./fns/resolve_velocity.js"
import {gridchunk_physics} from "./fns/gridchunk_physics.js"
import {ingest_player_intents} from "./fns/ingest_player_intents.js"
import {control_movements_and_rotations} from "./fns/control_movements_and_rotations.js"

export const runSystems = systems({
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

