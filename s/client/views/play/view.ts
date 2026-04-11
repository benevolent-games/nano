
import {light, shadow, spinner, useCss, useMount, useName, useOnce, useWait} from "@e280/sly"
import styleCss from "./style.css.js"
import {theme} from "../../utils/theme.js"
import {Game} from "../../../lib/game/game.js"
import {useCanvas} from "../../utils/use-canvas.js"
import {Realm} from "../../renderer/parts/realm.js"
import {Renderer} from "../../renderer/renderer.js"
import {UserInputs} from "../../utils/user-inputs.js"

export const Play = shadow(() => {
	useName("play")
	useCss(theme(), styleCss)

	const $wait = useWait(async() => {
		const userInputs = new UserInputs()
		const game = new Game(userInputs.port.actions, () => userInputs.port.resolve())
		const realm = await Realm.new()
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
		realm.canvas.width = rect.width
		realm.canvas.height = rect.height
	})

	const ctx = useOnce(() => canvas.getContext("2d")!)

	useMount(() => game.simulationLoop())

	useMount(() => renderer.renderLoop(() => {
		realm.scene.render()
		ctx.drawImage(realm.canvas, 0, 0)
	}))

	useMount(() => () => realm.dispose())

	return canvas
})

