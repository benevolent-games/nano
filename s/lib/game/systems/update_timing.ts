
import {asSystem} from "../utils/as-system.js"

export const update_timing = asSystem(pod => () => {
	pod.timing.update()
})

