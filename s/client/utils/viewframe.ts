
import {EntitiesReadonly} from "@benev/archimedes"
import {LoadAssetContainerAsync} from "@babylonjs/core/Loading/sceneLoader.js"

import {consts} from "../../consts.js"
import {Realm} from "../renderer/realm.js"
import {PlayerId} from "../../lib/game/types.js"
import {setupRender} from "../renderer/render.js"
import {makeVenue} from "../../lib/buddy/venue.js"
import {GameComponents} from "../../lib/game/parts/components.js"

export type Viewframe = Awaited<ReturnType<typeof makeViewframe>>

export async function makeViewframe(entities: EntitiesReadonly<GameComponents>, playerId: PlayerId) {
	const canvas = document.createElement("canvas")
	const venue = await makeVenue(canvas)
	const assets = await LoadAssetContainerAsync(consts.assets.art, venue.scene)

	const realm = new Realm(entities, playerId, venue, assets)
	const render = setupRender(realm)

	return {canvas, realm, render}
}

