
import {lifecycle} from "@benev/archimedes"
import {system} from "../utils/system.js"
import {Gridphys} from "../../systems/utils/gridphys.js"
import {Gridspace} from "../../../gridworld/utils/gridspace.js"

export const gridchunk_physics = system(pod => lifecycle(
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

