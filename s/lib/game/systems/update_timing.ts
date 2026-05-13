
import {Pod} from "../parts/pod.js"

export const update_timing = (pod: Pod) => () => {
	pod.timing.update()
}

