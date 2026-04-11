
import {light, shadow, spinner, useCss, useMount, useName, useOnce, useWait} from "@e280/sly"
import styleCss from "./style.css.js"
import {theme} from "../../utils/theme.js"
import {Game} from "../../../lib/game/game.js"
import {useCanvas} from "../../utils/use-canvas.js"
import {Realm} from "../../renderer/parts/realm.js"
import {Renderer} from "../../renderer/renderer.js"
import {UserInputs} from "../../utils/user-inputs.js"
import {makeVenue} from "../../renderer/parts/venue.js"

export const Play = shadow(() => {
	useName("play")
	useCss(theme(), styleCss)

	const $wait = useWait(async() => {
		const userInputs = new UserInputs()
		const game = new Game(userInputs.port.actions, () => userInputs.port.resolve())
		const realm = new Realm(await makeVenue())
		const renderer = new Renderer(game.space, realm)
		game.initialize()
		return {game, realm, renderer}
	})

	return spinner($wait(), GameReady)
})

const GameReady = light(({game, realm, renderer}: {
		game: Game
		realm: Realm
		renderer: Renderer
	}) => {

	const canvas = useCanvas((_canvas, rect) => {
		realm.venue.canvas.width = rect.width
		realm.venue.canvas.height = rect.height
	})

	const ctx = useOnce(() => canvas.getContext("2d")!)

	useMount(() => game.simulationLoop())

	useMount(() => renderer.renderLoop(() => {
		realm.venue.scene.render()
		ctx.drawImage(realm.venue.canvas, 0, 0)
	}))

	useMount(() => () => realm.dispose())

	return canvas
})

