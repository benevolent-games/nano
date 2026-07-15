
import {loadGltf} from "@babylonjs/lite"
import {EntitiesReadonly} from "@benev/archimedes"

import {PlayerId} from "../../lib/game/types.js"
import {Realm} from "../../lib/renderer/realm.js"
import {setupRender} from "../../lib/renderer/render.js"
import {makeVenue} from "../../lib/renderer/parts/venue.js"
import {GameComponents} from "../../lib/game/parts/components.js"

export type Viewframe = Awaited<ReturnType<typeof makeViewframe>>

export async function makeViewframe(artGlb: ArrayBuffer, entities: EntitiesReadonly<GameComponents>, playerId: PlayerId) {
	const canvas = document.createElement("canvas")
	const venue = await makeVenue(canvas)
	const assets = await loadGltf(venue.engine, artGlb)

	const realm = new Realm(canvas, entities, playerId, venue, assets)
	const render = setupRender(realm)

	return {canvas, realm, render}
}

