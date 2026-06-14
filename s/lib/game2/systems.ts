
import {consolidate} from "@benev/archimedes"
import {GamePod} from "./parts/pod.js"

export const systems = (pod: GamePod) => consolidate(pod, {
	// clock: {
	// 	timing_update,
	// },
	//
	// gridworld: {
	// 	hologrid_lifecycle,
	// 	hologrid_chunks,
	// },
	//
	// controls: {
	// 	ingest_player_intents,
	// 	player_spawning,
	// 	wish_mover,
	// 	wish_interactor,
	// 	wish_actions,
	// },
	//
	// mech: {
	// 	mech_mobility,
	// 	mech_aiming,
	// 	mech_sync_inventory_capacity,
	// },
	//
	// gameplay: {
	// 	target_lattice,
	// 	target_assignment,
	// 	item_pickups,
	// 	item_drops,
	// 	item_equip_mech_chassis,
	// 	item_contained,
	// },
	//
	// physics: {
	// 	gridchunk_physics,
	// 	physics_bodies,
	// 	physical_forces,
	// },
})

