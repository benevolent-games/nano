
import {light, loaders, shadow, useCss, useMount, useName, useOnce, useOp} from "@e280/sly"
import styleCss from "./style.css.js"
import {theme} from "../../utils/theme.js"
import {Game} from "../../../lib/game/game.js"
import {useCanvas} from "../../utils/use-canvas.js"
import {Realm} from "../../renderer/parts/realm.js"
import {Renderer} from "../../renderer/renderer.js"

const loader = loaders.make(loaders.anims.earth)

export const Play = shadow(() => {
	useName("play")
	useCss(theme(), styleCss)

	const op = useOp(async() => {
		const game = new Game()
		const realm = await Realm.new()
		const renderer = new Renderer(game.space, realm)
		game.initializeGridworld()
		return {game, realm, renderer}
	})

	return loader(op, x => GameReady(x.game, x.realm, x.renderer))
})

const GameReady = light((game: Game, realm: Realm, renderer: Renderer) => {
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

