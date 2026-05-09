
import {Graphic} from "./graphic.js"
import {PoolMember} from "./pool.js"
import {instantiate, Prop} from "./babtools.js"
import {resolveGridspace} from "../utils/resolve-gridspace.js"

export function poolify(prop: Prop): () => PoolMember<Graphic> {
	prop.setEnabled(false)

	return () => {
		const instance = instantiate(prop)
		instance.setEnabled(true)

		return {
			enable: () => { instance.setEnabled(true) },
			disable: () => { instance.setEnabled(false) },
			item: {
				setPosition: (gridspace, height) => {
					instance.position = resolveGridspace(gridspace, height)
				},
				setRotation: (_radians) => {
					throw new Error("TODO")
				},
			},
		}
	}
}

