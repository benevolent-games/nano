
import {Realm} from "../realm.js"
import {viewportToGridspace} from "../utils/viewport-to-gridspace.js"

export const cursor_update = (realm: Realm) => () => {
	const {camera} = realm.cam
	const {cursorRaw, cursor} = realm

	const aspectRatio = realm.canvas.width / realm.canvas.height

	cursor.set(
		viewportToGridspace(camera, aspectRatio, cursorRaw)
			?? cursor
	)
}

