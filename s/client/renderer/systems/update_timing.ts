
import {Realm} from "../parts/realm.js"
import {asSystem} from "../../../lib/tools/ecs-plus/as-system.js"

export const update_timing = asSystem<Realm>(realm => () => {
	realm.timing.update()
})

