
import {TeamArt} from "../types.js"
import {Art} from "../../buddy/art/art.js"

export function teamArt(name: string, population: number): TeamArt {
	return {
		t0: Art.new(name, population),
		t1: Art.new(`${name}-t1`, population),
		t2: Art.new(`${name}-t2`, population),
	}
}

