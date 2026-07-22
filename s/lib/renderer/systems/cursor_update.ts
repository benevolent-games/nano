
import {Realm} from "../realm.js"
import {viewportToGridspace} from "../utils/viewport-to-gridspace.js"

export const cursor_update = (realm: Realm) => () => {
	const {canvas} = realm.venue
	const {camera} = realm.cam
	const {cursorRaw, cursor} = realm

	const aspectRatio = canvas.width / canvas.height

	cursor.set(
		viewportToGridspace(camera, aspectRatio, cursorRaw)
			?? cursor
	)
}

