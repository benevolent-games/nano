
import {count, Rand, seed} from "@e280/stz"
import {unindex2d} from "../../tools/index2d.js"
import {Gridworld, TileKind} from "../../gridworld/types.js"

export function* sprinkle(gridworld: Gridworld, seedNumber: number, countNumber: number) {
	const rand = new Rand(seed(seedNumber))
	const occupied = new Set<number>()

	for (const i of count(countNumber * 10)) {
		if (i > countNumber) break
		const index = rand.index(gridworld.tiles.length)
		if (occupied.has(index)) continue
		const tile = gridworld.tiles[index]
		if (tile === TileKind.Floor) {
			occupied.add(index)
			yield unindex2d(gridworld.extent, index)
		}
	}
}

