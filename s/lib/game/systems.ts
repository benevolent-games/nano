
import {consolidate} from "@benev/archimedes"

import {Pod} from "./parts/pod.js"
import {target_assignment} from "./systems/target_assignment.js"
import {mech_aiming} from "./systems/mech_aiming.js"
import {mech_mobility} from "./systems/mech_mobility.js"
import {timing_update} from "./systems/timing_update.js"
import {target_lattice} from "./systems/target_lattice.js"
import {player_spawning} from "./systems/player_spawning.js"
import {physics_bodies} from "./systems/physics_bodies.js"
import {physical_forces} from "./systems/physical_forces.js"
import {hologrid_chunks} from "./systems/hologrid_chunks.js"
import {gridchunk_physics} from "./systems/gridchunk_physics.js"
import {hologrid_lifecycle} from "./systems/hologrid_lifecycle.js"
import {ingest_player_intents} from "./systems/ingest_player_intents.js"
import {wish_mover} from "./systems/wish_mover.js"
import {wish_interactor} from "./systems/wish_interactor.js"
import {wish_actions} from "./systems/wish_actions.js"
import {mech_sync_inventory_capacity} from "./systems/mech_sync_inventory_capacity.js"
import {item_pickups} from "./systems/item_pickups.js"
import {item_drops} from "./systems/item_drops.js"
import {item_contained} from "./systems/item_contained.js"
import {item_equip_mech_chassis} from "./systems/item_equip_mech_chassis.js"

export const systems = (pod: Pod) => consolidate(pod, {
	clock: {
		timing_update,
	},

	gridworld: {
		hologrid_lifecycle,
		hologrid_chunks,
	},

	controls: {
		ingest_player_intents,
		player_spawning,
		wish_mover,
		wish_interactor,
		wish_actions,
	},

	mech: {
		mech_mobility,
		mech_aiming,
		mech_sync_inventory_capacity,
	},

	gameplay: {
		target_lattice,
		target_assignment,
		item_pickups,
		item_drops,
		item_equip_mech_chassis,
		item_contained,
	},

	physics: {
		gridchunk_physics,
		physics_bodies,
		physical_forces,
	},
})

