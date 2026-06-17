
import {html} from "lit"
import {light, loot, useMount, useOnce, useSignal} from "@e280/sly"
import {LoadAssetContainerAsync} from "@babylonjs/core/Loading/sceneLoader.js"

import {rafloop} from "../../utils/rafloop.js"
import {Viewframe} from "../../utils/viewframe.js"
import {useResizeObserver} from "../../utils/use-resize-observer.js"

export const Perspective = light(({canvas, realm, render}: Viewframe) => {
	const $resolution = useSignal(0.5)
	const $ren = useSignal(0)
	const $bab = useSignal(0)
	const $all = useSignal(0)

	useMount(() => () => realm.dispose())

	useResizeObserver(canvas, rect => {
		canvas.width = Math.floor(rect.width * $resolution()) || 1
		canvas.height = Math.floor(rect.height * $resolution()) || 1
	})

	useMount(() => rafloop(() => {
		const start = performance.now()

		const renStart = performance.now()
		render()
		$ren(performance.now() - renStart)

		const babStart = performance.now()
		realm.venue.scene.render()
		$bab(performance.now() - babStart)

		$all(performance.now() - start)
	}))

	const drops = useOnce(() => new loot.Drops({
		predicate: loot.hasFiles,
		acceptDrop: async event => {
			const [file] = loot.files(event)
			const assets = await LoadAssetContainerAsync(file, realm.venue.scene, {pluginExtension: ".glb"})
			realm.replaceAssets(assets)
		},
	}))

	function num(n: number) {
		return n.toFixed(1).padStart(4, "0")
	}

	function renderStat(label: string, ms: number) {
		return html`
			<div>
				<span>${num(ms)}ms</span>
				<span>${label}</span>
			</div>
		`
	}

	return html`
		<div
			class=perspective
			?data-drop=${drops.$indicator()}
			@dragover=${drops.dragover}
			@dragleave=${drops.dragleave}
			@drop=${drops.drop}
			>
			${canvas}

			<div class=stats>
				${renderStat("all", $all())}
				${renderStat("ecs", $ren())}
				${renderStat("bab", $bab())}
			</div>
		</div>
	`
})

