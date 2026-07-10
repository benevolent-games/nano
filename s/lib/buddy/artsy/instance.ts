
import {Quat, Vec3} from "@benev/math"

export class Instance {
	visible = true
	scale = new Vec3(1, 1, 1)
	position = new Vec3()
	rotation = new Quat()
	constructor(public readonly dispose: () => void) {}
}

