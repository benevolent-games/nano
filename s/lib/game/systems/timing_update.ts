
import {Pod} from "../parts/pod.js"

export const timing_update = (pod: Pod) => () => {
	pod.timing.update()
}

