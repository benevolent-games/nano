
import {Port, KeyboardDevice} from "@benev/tact"
import {gameBindings} from "../../lib/game/parts/bindings.js"

export class UserInputs {
	port = new Port(gameBindings)
	#keyboard = new KeyboardDevice()

	constructor() {
		this.port.devices.add(this.#keyboard)
		this.port.modes.add("control")
	}

	dispose() {
		this.#keyboard.dispose()
	}
}

