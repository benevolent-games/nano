import { got } from "@e280/stz";
import { art } from "../../game/art.js";

export function needArt(key: keyof typeof art) {
	return got(art[key])
}

