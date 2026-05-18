
import {Art} from "./art.js"
import {Prop} from "../buddy/buddy.js"

export function validateProps(props: Map<string, Prop>, artwork: Record<string, Art>) {
	for (const art of Object.values(artwork)) {
		if (!props.has(art.name))
			throw new Error(`art not found "${art.name}"`)
	}
}

