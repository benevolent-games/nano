
import {Realm} from "../renderer/parts/realm.js"
import {Renderer} from "../renderer/renderer.js"
import {makeVenue} from "../renderer/parts/venue.js"
import {EntitiesReadonly} from "@benev/archimedes"
import {GameComponents} from "../../lib/game/parts/components.js"

export type Viewframe = Awaited<ReturnType<typeof makeViewframe>>

export async function makeViewframe(entities: EntitiesReadonly<GameComponents>) {
	const canvas = document.createElement("canvas")
	const realm = new Realm(entities, await makeVenue(canvas))
	const renderer = new Renderer(realm)
	return {canvas, realm, renderer}
}

