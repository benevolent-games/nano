
import {is} from "@e280/stz"
import {Vec2} from "@benev/math"
import {Realm} from "../realm.js"
import {viewportToGridspace} from "../utils/viewport-to-gridspace.js"

const corners = [
	new Vec2(0, 0),
	new Vec2(1, 0),
	new Vec2(1, 1),
	new Vec2(0, 1),
]

export const viewrect_update = (realm: Realm) => () => {
	const {camera} = realm.cam
	const {viewrect} = realm

	const gridspaceCorners = corners
		.map(v => viewportToGridspace(camera, v))
		.filter(is.happy)

	viewrect.min.x = Math.min(...gridspaceCorners.map(v => v.x))
	viewrect.min.y = Math.min(...gridspaceCorners.map(v => v.y))

	viewrect.max.x = Math.max(...gridspaceCorners.map(v => v.x))
	viewrect.max.y = Math.max(...gridspaceCorners.map(v => v.y))
}

