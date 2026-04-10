
import {Vector3} from "@babylonjs/core/Maths/math.vector.js"
import {Gridspace} from "../../../lib/game/parts/units.js"

export function resolveGridspace({x, y}: Gridspace, z = 0) {
	return new Vector3(-x, z, -y)
}

