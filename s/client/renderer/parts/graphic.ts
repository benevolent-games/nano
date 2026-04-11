
import {Gridspace} from "../../../lib/game/parts/units.js"

export type Graphic = {
	setPosition(gridspace: Gridspace, height?: number): void
	setRotation(radians: number): void
}

