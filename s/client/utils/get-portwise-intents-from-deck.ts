
import {Deck, Intent} from "@benev/tact"

export function getPortwiseIntentsFromDeck(deck: Deck, now = Date.now()) {
	const map = new Map<string, Intent[]>()

	for (const port of deck.ports) {
		map.set(port, deck
			.getAllControllersOnPort(port)
			.map(id => deck.controllers.need(id))
			.flatMap(controller => controller.resolveIntents(now)))
	}

	return map
}

