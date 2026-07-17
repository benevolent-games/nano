
import {html} from "lit"
import {waitGet} from "@e280/strata"
import {renderFrame} from "@babylonjs/lite"
import {EntitiesReadonly} from "@benev/archimedes"
import {light, spinner, useMount, useOnce, useSignal, useWait} from "@e280/sly"

import {rafloop} from "../../../utils/rafloop.js"
import {PlayerId} from "../../../../lib/game/types.js"
import {Realm} from "../../../../lib/renderer/realm.js"
import {setupRender} from "../../../../lib/renderer/render.js"
import {GameComponents} from "../../../../lib/game/parts/components.js"
import {useResizeObserver} from "../../../utils/use-resize-observer.js"
import {makeVenue, Venue} from "../../../../lib/renderer/parts/venue.js"

export const Viewport = light((
		artGlb: ArrayBuffer,
		playerId: PlayerId,
		entities: EntitiesReadonly<GameComponents>,
	) => {

	const $wait = useWait(
		async() => {
			const canvas = document.createElement("canvas")
			return makeVenue({canvas, artGlb})
		},
		venue => venue.dispose(),
	)

	useMount(() => () => {
		const venue = waitGet($wait())
		if (venue) venue.dispose()
	})

	return spinner($wait(), venue => Cockpit(venue, playerId, entities))
})

export const Cockpit = light((
		venue: Venue,
		playerId: PlayerId,
		entities: EntitiesReadonly<GameComponents>,
	) => {

	const {canvas} = venue
	const realm = useOnce(() => new Realm({venue, playerId, entities}))
	const render = useOnce(() => setupRender(realm))
	const $resolution = useSignal(0.5)

	useMount(() => () => {
		realm.dispose()
		venue.dispose()
	})

	useResizeObserver(canvas, rect => {
		canvas.width = Math.floor(rect.width * $resolution()) || 1
		canvas.height = Math.floor(rect.height * $resolution()) || 1
	})

	useMount(() => rafloop(() => {
		render()
		renderFrame(venue.engine, 1000 / 60)
	}))

	return html`
		${venue.canvas}
	`
})




	// const $resolution = useSignal(0.5)
	// const $ren = useSignal(0)
	// const $bab = useSignal(0)
	// const $all = useSignal(0)
	//
	// useMount(() => () => realm.dispose())
	//
	// useResizeObserver(canvas, rect => {
	// 	canvas.width = Math.floor(rect.width * $resolution()) || 1
	// 	canvas.height = Math.floor(rect.height * $resolution()) || 1
	// })
	//
	// useMount(() => rafloop(() => {
	// 	const start = performance.now()
	//
	// 	const renStart = performance.now()
	// 	render()
	// 	$ren(performance.now() - renStart)
	//
	// 	const babStart = performance.now()
	// 	renderFrame(realm.venue.engine, 1000 / 60)
	// 	$bab(performance.now() - babStart)
	//
	// 	$all(performance.now() - start)
	// }))
	//
	// const drops = useOnce(() => new loot.Drops({
	// 	predicate: loot.hasFiles,
	// 	acceptDrop: async event => {
	// 		const [file] = loot.files(event)
	// 		const assets = await loadGltf(realm.venue.engine, file)
	// 		realm.replaceAssets(assets)
	// 	},
	// }))
	//
	// function num(n: number) {
	// 	return n.toFixed(1).padStart(4, "0")
	// }
	//
	// function renderStat(label: string, ms: number) {
	// 	return html`
	// 		<div>
	// 			<span>${num(ms)}ms</span>
	// 			<span>${label}</span>
	// 		</div>
	// 	`
	// }
	//
	// return html`
	// 	<div
	// 		class=perspective
	// 		?data-drop=${drops.$indicator()}
	// 		@dragover=${drops.dragover}
	// 		@dragleave=${drops.dragleave}
	// 		@drop=${drops.drop}
	// 		>
	// 		${canvas}
	//
	// 		<div class=stats>
	// 			${renderStat("all", $all())}
	// 			${renderStat("ecs", $ren())}
	// 			${renderStat("bab", $bab())}
	// 		</div>
	// 	</div>
	// `
	
