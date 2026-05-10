
import {lifecycle} from "@benev/archimedes"
import {Pod} from "../parts/pod.js"
import {Gridphys} from "../utils/gridphys.js"
import {asSystem} from "../utils/as-system.js"
import {Gridspace} from "../../gridworld/utils/gridspace.js"

export const gridchunk_physics = asSystem<Pod>(pod => lifecycle(
	pod.entities,
	["gridchunk", "position"],
	(id, components) => {
		const position = new Gridspace().from(components.position)
		const gridphys = new Gridphys(pod.physLattice, id, position)
		return {
			tick: (components) => gridphys.update(components.gridchunk),
			exit: () => gridphys.dump(),
		}
	},
))

