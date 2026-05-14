
import {seed} from "@e280/stz"
import {Pod} from "../parts/pod.js"

export const timing_update = (pod: Pod) => () => {
	pod.timing.update()
	pod.rand.random = seed(Math.floor(pod.timing.tick / 60))
}

