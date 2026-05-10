
import {disposer} from "@e280/stz"
import {lifecycle} from "@benev/archimedes"

import {Realm} from "../parts/realm.js"
import {Proximal} from "../utils/proximal.js"
import {TileKind} from "../../../lib/gridworld/types.js"
import {asSystem} from "../../../lib/tools/ecs-plus/as-system.js"
import {Gridchunk} from "../../../lib/gridworld/chunk/gridchunk.js"
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"

export const render_gridchunks = asSystem<Realm>(realm => lifecycle(realm.entities, ["gridchunk", "position"], (_id, components) => {
	const chunk = new Gridchunk(new Gridspace().from(components.position))
	const proximal = new Proximal(realm.focal, 40)
	const wipe = disposer()

	function renderFloorsAndWalls(gridchunk: string) {
		wipe()
		chunk.hex = gridchunk
		for (const {tile, position} of chunk) {
			const center = position.dup().addBy(0.5)

			if (tile !== TileKind.Pit) {
				const [graphic, disposer] = realm.pools.floors.lease()
				wipe.schedule(disposer)
				graphic.setPosition(center)
			}

			if (tile === TileKind.Wall) {
				const [graphic, disposer] = realm.pools.walls.lease()
				wipe.schedule(disposer)
				graphic.setPosition(center, 1)
			}
		}
	}

	return {
		tick(components) {
			const changed = proximal.check(chunk.center)
			if (proximal.nearby && chunk.hex !== components.gridchunk)
				renderFloorsAndWalls(components.gridchunk)
			else if (changed && proximal.nearby)
				renderFloorsAndWalls(components.gridchunk)
			else if (changed && !proximal.nearby)
				wipe()
		},
		exit() {
			wipe()
		},
	}
}))

