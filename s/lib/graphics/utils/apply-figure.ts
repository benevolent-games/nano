
import {Xyz, Xyzw} from "@benev/math"
import {Quaternion} from "@babylonjs/core/Maths/math.js"

import {Graphic} from "../graphic.js"
import {Prop} from "../../buddy/buddy.js"

export function applyFigure(figure: Graphic, prop: Prop) {
	if (prop.isEnabled() !== figure.visible)
		prop.setEnabled(figure.visible)

	if (figure.visible) {
		applyVec(figure.scale, prop.scaling)
		applyVec(figure.position, prop.position)
		applyQuat(figure.rotation, prop.rotationQuaternion ??= Quaternion.Identity())
	}
}

function applyVec(source: Xyz, target: Xyz) {
	if (target.x !== source.x) target.x = source.x
	if (target.y !== source.y) target.y = source.y
	if (target.z !== source.z) target.z = source.z
}

function applyQuat(source: Xyzw, target: Xyzw) {
	if (target.x !== source.x) target.x = source.x
	if (target.y !== source.y) target.y = source.y
	if (target.z !== source.z) target.z = source.z
	if (target.w !== source.w) target.w = source.w
}

