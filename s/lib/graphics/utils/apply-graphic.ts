
import {Xyz, Xyzw} from "@benev/math"
import {Quaternion} from "@babylonjs/core/Maths/math.js"

import {Graphic} from "../graphic.js"
import {Prop} from "../../buddy/buddy.js"

export function applyGraphic(graphic: Graphic, prop: Prop) {
	if (prop.isEnabled() !== graphic.visible)
		prop.setEnabled(graphic.visible)

	if (graphic.visible) {
		applyVec(graphic.scale, prop.scaling)
		applyVec(graphic.position, prop.position)
		applyQuat(graphic.rotation, prop.rotationQuaternion ??= Quaternion.Identity())
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

