
import {NoExtra} from "../../../lib/tools/no-extra.js"
import {GameComponents} from "../parts/components.js"

export function archetype<C extends Partial<GameComponents>>(c: NoExtra<C, Partial<GameComponents>>) {
	return c
}

