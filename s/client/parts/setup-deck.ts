
import {Content} from "@e280/sly"
import {LocalStore} from "@e280/strata"
import {Deck, DeckState, Devices, GamepadDevice, KeyboardDevice, onPad, PointerDevice} from "@benev/tact"

import {bindings} from "../../lib/game/parts/bindings.js"
import {stockProfiles} from "./stock-profiles.js"

export async function setupDeck() {
	const store = new LocalStore<DeckState>("tactDeck")
	const deck = new Deck({store, stockProfiles})

	await deck.load()
	store.onStorageEvent(() => deck.load())

	const port = deck.createPort()
	const controller = deck.createController("primary", bindings, new Devices(
		new KeyboardDevice(),
		new PointerDevice(),
	))

	port.plug(controller)

	const labels = new Map<any, Content>()
		.set(controller, "⌨️🖱keyboard+mouse")

	onPad(pad => {
		const handle = `(${pad.gamepad.index + 1}) ${pad.gamepad.id}`
		const controller = deck.createController(handle, bindings, new GamepadDevice(pad))
		labels.set(controller, `🎮${handle}`)

		const port = deck.createPort()
		port.plug(controller)

		// TODO we need to delete the port and remove this async shit
		console.log("new controller and port", controller.handle)

		return () => {
			console.log("del controller and port", controller.handle)
			deck.deletePort(port)
			deck.deleteController(controller)
		}
	})

	return {deck, labels}
}

