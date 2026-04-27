
import {html} from "lit"
import {light, shadow, spinner, useCss, useMount, useName, useOnce, useSignal, useWait} from "@e280/sly"

import styleCss from "./style.css.js"
import {theme} from "../../utils/theme.js"
import {Game} from "../../../lib/game/game.js"
import {useCanvasSizing} from "../../utils/use-canvas-sizing.js"
import {Realm} from "../../renderer/parts/realm.js"
import {Renderer} from "../../renderer/renderer.js"
import {Pulser} from "../../../lib/tools/pulser.js"
import {UserInputs} from "../../utils/user-inputs.js"
import {makeVenue} from "../../renderer/parts/venue.js"
import {rafloop} from "../../renderer/utils/rafloop.js"
import { consts } from "../../../consts.js"

export const Play = shadow(() => {
	useName("play")
	useCss(theme(), styleCss)

	const $wait = useWait(async() => {
		const userInputs = new UserInputs()
		const canvas = document.createElement("canvas")
		const game = new Game(userInputs.port.actions, () => userInputs.port.resolve())
		const realm = new Realm(game.entities.readonly, await makeVenue(canvas))
		const renderer = new Renderer(realm)
		game.initialize()
		return {game, realm, renderer, canvas}
	})

	return spinner($wait(), GameReady)
})

const GameReady = light(({game, realm, renderer, canvas}: {
		game: Game
		realm: Realm
		renderer: Renderer
		canvas: HTMLCanvasElement
	}) => {

	const $sim = useSignal(0)
	const $ren = useSignal(0)
	const $bab = useSignal(0)
	const $all = useSignal(0)

	useMount(() => () => realm.dispose())

	useCanvasSizing(canvas, rect => {
		realm.venue.canvas.width = rect.width
		realm.venue.canvas.height = rect.height
	})

	const simPulse = useOnce(() => new Pulser(consts.simulationHz.max))

	useMount(() => rafloop(() => {
		const start = performance.now()
		if (simPulse.check()) {
			game.simulate()
			$sim(performance.now() - start)
		}

		const renStart = performance.now()
		renderer.render()
		$ren(performance.now() - renStart)

		const babStart = performance.now()
		realm.venue.scene.render()
		$bab(performance.now() - babStart)

		$all(performance.now() - start)
	}))

	function num(n: number) {
		return n.toFixed(1).padStart(4, "0")
		// return Math.round(n).toString().padStart(2, "0")
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
		${canvas}

		<div class=stats>
			${renderStat("whole tick", $all())}
			${renderStat("ecs simulation", $sim())}
			${renderStat("ecs rendering", $ren())}
			${renderStat("babylon rendering", $bab())}
			<br/>
			${game.stats.map(stats => renderStat(stats.name, stats.ms))}
		</div>
	`
})

