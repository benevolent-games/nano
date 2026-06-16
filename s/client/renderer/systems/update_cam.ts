
import {Realm} from "../realm.js"

export const update_cam = (realm: Realm) => () => {
	for (const [_id, components] of realm.entities.select("controlledBy", "position", "cam")) {
		if (components.controlledBy === realm.playerId) {
			realm.focal.from(components.position)
			realm.cam.lerpTowards({
				focal: realm.focal.array(),
				fov: components.cam.fov,
				swivel: components.cam.swivel,
				tilt: components.cam.tilt,
				zoom: components.cam.zoom,
				lerp: components.cam.lerp,
			})
		}
	}
}

