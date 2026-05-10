
import {Realm} from "../parts/realm.js"
import {asSystem} from "../../../lib/tools/ecs-plus/as-system.js"

export const update_cam = asSystem<Realm>(realm => () => {
	const {cam} = realm.venue

	for (const [_id, components] of realm.entities.select("controlledBy", "position", "cam")) {
		if (components.controlledBy === realm.playerId) {
			realm.focal.from(components.position)
			cam.lerpTowards({
				focal: realm.focal.array(),
				fov: components.cam.fov,
				swivel: components.cam.swivel,
				tilt: components.cam.tilt,
				zoom: components.cam.zoom,
				lerp: components.cam.lerp,
			})
		}
	}
})

