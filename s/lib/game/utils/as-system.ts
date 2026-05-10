
import {Pod} from "../parts/pod.js"

export function asSystem(fn: (pod: Pod) => () => void) {
	return fn
}

