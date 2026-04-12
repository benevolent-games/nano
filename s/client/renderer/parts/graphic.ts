
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"

export type Graphic = {
	setPosition(gridspace: Gridspace, height?: number): void
	setRotation(radians: number): void
}

