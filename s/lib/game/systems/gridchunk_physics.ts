
import {lifecycle} from "@benev/archimedes"
import {asSystem} from "../utils/as-system.js"
import {Gridphys} from "../utils/gridphys.js"
import {Gridspace} from "../../gridworld/utils/gridspace.js"

export const gridchunk_physics = asSystem(pod => lifecycle(
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

