
import {Circle, Rect} from "@benev/math"

export class PhysBox {
	constructor(public rect: Rect) {}
}

export class PhysCircle {
	constructor(public circle: Circle) {}
}

export type Phys =
	| PhysBox
	| PhysCircle

