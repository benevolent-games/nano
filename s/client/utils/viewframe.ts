
import {loadGltf} from "@babylonjs/lite"
import {EntitiesReadonly} from "@benev/archimedes"

import {Basis} from "../types.js"
import {Realm} from "../renderer/realm.js"
import {PlayerId} from "../../lib/game/types.js"
import {setupRender} from "../renderer/render.js"
import {makeVenue} from "../renderer/parts/venue.js"
import {GameComponents} from "../../lib/game/parts/components.js"

export type Viewframe = Awaited<ReturnType<typeof makeViewframe>>

export async function makeViewframe(basis: Basis, entities: EntitiesReadonly<GameComponents>, playerId: PlayerId) {
	const canvas = document.createElement("canvas")
	const venue = await makeVenue(canvas)
	const assets = await loadGltf(venue.engine, basis.artGlbUrl)

	const realm = new Realm(canvas, entities, playerId, venue, assets)
	const render = setupRender(realm)

	return {canvas, realm, render}
}

