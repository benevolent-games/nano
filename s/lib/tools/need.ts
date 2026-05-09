
import {is} from "@e280/stz";

export function need<X>(thing: X | undefined | null): X {
	if (is.sad(thing)) throw new Error(`failed to get needed thing`)
	return thing
}

