
import {Vector3} from "@babylonjs/core/Maths/math.vector.js"
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"

export function resolveGridspace({x, y}: Gridspace, z = 0) {
	return new Vector3(-x, z, -y)
}

