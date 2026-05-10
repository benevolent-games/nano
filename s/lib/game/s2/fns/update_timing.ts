
import {system} from "../utils/system.js"

export const update_timing = system(weave => () => {
	weave.timing.update()
})

