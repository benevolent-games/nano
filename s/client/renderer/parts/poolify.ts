
import {Graphic} from "./graphic.js"
import {PoolMember} from "./pool.js"
import {instantiate, Prop} from "./babtools.js"
import {resolveGridspace} from "../utils/resolve-gridspace.js"

export function poolify(prop: Prop): () => PoolMember<Graphic> {
	prop.isVisible = false

	return () => {
		const instance = instantiate(prop)
		instance.isVisible = true

		return {
			enable: () => { instance.isVisible = true },
			disable: () => { instance.isVisible = false },
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

