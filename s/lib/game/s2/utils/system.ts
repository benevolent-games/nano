
import {Pod} from "../pod.js"

export function system(fn: (pod: Pod) => () => void) {
	return fn
}

