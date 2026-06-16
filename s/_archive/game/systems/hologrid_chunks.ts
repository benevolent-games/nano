
import {got} from "@e280/stz"
import {Pod} from "../parts/pod.js"

export const hologrid_chunks = (pod: Pod) => () => {
	const hologrid = got(pod.hologrid)
	for (const [id, components] of pod.entities.select("gridchunk", "position"))
		hologrid.updateChunk(id, components)
}

