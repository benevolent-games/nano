
import {system} from "../utils/system.js"

export const update_timing = system(pod => () => {
	pod.timing.update()
})

