
import {cycle, nap} from "@e280/stz"
import {shadow, spinner, useCss, useMount, useName, useOnce} from "@e280/sly"

import styleCss from "./style.css.js"
import {consts} from "../../../consts.js"
import {theme} from "../../utils/theme.js"
import {Game} from "../../../lib/game/game.js"
import {Perspective} from "./subviews/perspective.js"
import {Multiframe} from "../../utils/multiframe.js"
import {UserInputs} from "../../utils/user-inputs.js"
import {initialize} from "../../../lib/game/initialize.js"
import { html } from "lit"

export const Play = shadow(() => {
	useName("play")
	useCss(theme(), styleCss)

	const userInputs = useOnce(() => new UserInputs())

	const game = useOnce(() => {
		const game = new Game(userInputs.port.actions, () => userInputs.port.resolve())
		initialize(game)
		game.entities
		return game
	})

	useMount(() => cycle(async() => {
		game.simulate()
		await nap(1000 / consts.simulationHz.max)
	}))

	const multiframe = useOnce(() => new Multiframe(game.entities.readonly))
	useOnce(() => multiframe.spawn())
	useOnce(() => multiframe.spawn())
	const frames = multiframe.list()

	return html`
		<div class=shell>
			${frames.map($frame => spinner($frame.value, Perspective))}
		</div>
	`
})

