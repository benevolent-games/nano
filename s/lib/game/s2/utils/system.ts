
import {Weave} from "../weave.js"

export function system(fn: (weave: Weave) => () => void) {
	return fn
}

