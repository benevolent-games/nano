
import {Entity} from "../types.js"

export function flatten(entities: Entity[]) {
	const flat: Entity[] = []

	function crawl(e: Entity) {
		flat.push(e)
		e.children.forEach(crawl)
	}

	entities.forEach(crawl)
	return flat
}

