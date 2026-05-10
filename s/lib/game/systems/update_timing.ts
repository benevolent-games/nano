
import {Pod} from "../parts/pod.js"
import {asSystem} from "../../tools/ecs-plus/as-system.js"

export const update_timing = asSystem<Pod>(pod => () => {
	pod.timing.update()
})

