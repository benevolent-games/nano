
import {seed} from "@e280/stz"
import {Pod as Pod} from "../parts/graph.js"

export const timing_update = (pod: Pod) => () => {
	pod.timing.update()
	if (pod.timing.tick % 60 === 0)
		pod.rand.random = seed(pod.timing.tick)
}

