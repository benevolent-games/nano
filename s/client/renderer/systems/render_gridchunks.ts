
import {Vec3} from "@benev/math"
import {lifecycle} from "@benev/archimedes"
import {disposer, Rand, seed} from "@e280/stz"

import {Realm} from "../parts/realm.js"
import {consts} from "../../../consts.js"
import {Proximal} from "../utils/proximal.js"
import {TileKind} from "../../../lib/gridworld/types.js"
import {Gridchunk} from "../../../lib/gridworld/chunk/gridchunk.js"
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"
import {gridChunkSize} from "../../../lib/gridworld/utils/grid-chunk-size.js"

export const render_gridchunks = (realm: Realm) => lifecycle(
	realm.entities,
	["gridchunk", "position"],

	(_id, components) => {
		const chunk = new Gridchunk(new Gridspace().from(components.position))
		const proximal = new Proximal()
		const rand = new Rand(seed(1))

		return {
			tick(components) {
				const chunkcenter = new Gridspace().from(components.position).add(gridChunkSize().divBy(2))

				if (chunk.hex !== components.gridchunk)
					proximal.invalidate()

				proximal.on(consts.renderProximity, realm.focal, chunkcenter, () => {
					const dispose = disposer()
					chunk.hex = components.gridchunk

					for (const {tile, position} of chunk.tiles()) {
						const center = position.dup().addBy(0.5)

						if (tile !== TileKind.Pit) {
							const [graphic, disposer] = realm.pools.floors.lease()
							dispose.schedule(disposer)
							graphic.setGridspace(center)
						}

						if (tile === TileKind.Wall) {
							const [graphic, disposer] = realm.pools.walls.lease()
							dispose.schedule(disposer)
							graphic.setGridspace(center)
							graphic.setScale(new Vec3(1, 1, rand.range(0.3, 1)))
						}
					}

					return () => {
						dispose()
					}
				})
			},
			exit() {
				proximal.dispose()
			},
		}
	},
)

