
import {Realm} from "../realm.js"

export const cam_update = (realm: Realm) => () => {
	for (const [_id, components] of realm.entities.select("controlledBy", "position", "cam")) {
		if (components.controlledBy === realm.playerId) {
			realm.focal.from(components.position)
			realm.cam.lerpTowards({
				focal: realm.focal.tuple(),
				fov: components.cam.fov,
				swivel: components.cam.swivel,
				tilt: components.cam.tilt,
				zoom: components.cam.zoom,
				lerp: components.cam.lerp,
			})
		}
	}
}

