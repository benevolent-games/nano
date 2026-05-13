
import {EntitiesReadonly} from "@benev/archimedes"
import {LoadAssetContainerAsync} from "@babylonjs/core/Loading/sceneLoader.js"

import {consts} from "../../consts.js"
import {Realm} from "../renderer/parts/realm.js"
import {Renderer} from "../renderer/renderer.js"
import {makeVenue} from "../renderer/parts/venue.js"
import {PlayerId} from "../../lib/game/utils/players.js"
import {GameComponents} from "../../lib/game/parts/components.js"

export type Viewframe = Awaited<ReturnType<typeof makeViewframe>>

export async function makeViewframe(entities: EntitiesReadonly<GameComponents>, playerId: PlayerId) {
	const canvas = document.createElement("canvas")
	const venue = await makeVenue(canvas)
	const art = await LoadAssetContainerAsync(consts.assets.art, venue.scene)
	const realm = new Realm(entities, playerId, venue, art)
	const renderer = new Renderer(realm)
	return {canvas, realm, renderer}
}

