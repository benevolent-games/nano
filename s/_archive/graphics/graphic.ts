
import {Quat, Vec3} from "@benev/math"
import {Art} from "./art.js"

export class Graphic {
	visible = true
	scale = new Vec3(1, 1, 1)
	position = new Vec3()
	rotation = new Quat()
	constructor(public readonly art: Art) {}
}

