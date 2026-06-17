
import {Realm} from "../realm.js"
import {viewportToGridspace} from "../utils/viewport-to-gridspace.js"

export const cursor_update = (realm: Realm) => () => {
	const {camera} = realm.cam
	const {cursorRaw, cursor} = realm

	cursor.set(
		viewportToGridspace(camera, cursorRaw)
			?? cursor
	)
}

