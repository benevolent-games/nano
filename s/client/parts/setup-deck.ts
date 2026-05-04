
import {Content} from "@e280/sly"
import {LocalStore} from "@e280/strata"
import {Controller, Deck, DeckState, Devices, GamepadDevice, KeyboardDevice, onPad, PointerDevice} from "@benev/tact"

import {bindings} from "../../lib/game/parts/bindings.js"
import {stockProfiles} from "./stock-profiles.js"

export async function setupDeck() {
	const store = new LocalStore<DeckState>("tactDeck")
	const deck = new Deck({store, stockProfiles})

	await deck.load()
	store.onStorageEvent(() => deck.load())

	const port = await deck.createPort()
	const controller = new Controller(bindings, new Devices(
		new KeyboardDevice(),
		new PointerDevice(),
	))

	await deck.connectController("primary", controller)
	await deck.plug("primary", port)

	const labels = new Map<any, Content>()
		.set(controller, "⌨️🖱keyboard+mouse")

	onPad(pad => {
		const id = `(${pad.gamepad.index}) ${pad.gamepad.id}`
		const controller = new Controller(bindings, new GamepadDevice(pad))
		labels.set(controller, `🎮${id}`)
		void async function() {
			const port = await deck.createPort()
			await deck.connectController(id, controller)
			await deck.plug(id, port)

			// TODO we need to delete the port and remove this async shit
			console.log("new port", port)
		}()
		return () => deck.disconnectController(id)
	})

	return {deck, labels}
}

