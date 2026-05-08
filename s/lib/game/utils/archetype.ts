
import {GameComponents} from "../parts/components.js"

export function archetype<C extends Partial<GameComponents>>(c: C) {
	return c
}

