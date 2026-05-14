
import {Quat} from "@benev/math"
import {Quaternion} from "@babylonjs/core/Maths/math.js"

import {Graphic} from "./graphic.js"
import {PoolMember} from "./pool.js"
import {instantiate, Prop} from "./buddy.js"
import {resolveGridspace, resolvePosition, resolveScale} from "../utils/resolve-gridspace.js"

export function poolify(prop: Prop): () => PoolMember<Graphic> {
	prop.setEnabled(false)

	return () => {
		const instance = instantiate(prop)
		instance.setEnabled(true)

		return {
			enable: () => { instance.setEnabled(true) },
			disable: () => { instance.setEnabled(false) },
			item: {
				setScale: vector => {
					instance.scaling = resolveScale(vector)
				},

				setPosition: vector => {
					instance.position = resolvePosition(vector)
				},

				setGridspace: (gridspace, height) => {
					instance.position = resolveGridspace(gridspace, height)
				},

				setRotation: radians => {
					instance.rotationQuaternion ??= Quaternion.Identity()
					instance.rotationQuaternion.set(...Quat.rotate_(0, radians, 0).array())
				},

				setVisibility: visible => {
					instance.setEnabled(visible)
				},
			},
		}
	}
}

