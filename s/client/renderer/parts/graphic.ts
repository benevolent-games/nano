
import {Vec3} from "@benev/math"
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"

export type Graphic = {
	setScale(vec: Vec3): void
	setPosition(vec: Vec3): void
	setRotation(radians: number): void
	setGridspace(gridspace: Gridspace, height?: number): void
}

