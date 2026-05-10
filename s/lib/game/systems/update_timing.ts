
import {Pod} from "../parts/pod.js"
import {asSystem} from "../utils/as-system.js"

export const update_timing = asSystem<Pod>(pod => () => {
	pod.timing.update()
})

