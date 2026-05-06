
import {asBindings, Profile} from "@benev/tact"
import {bindings} from "../../lib/game/parts/bindings.js"

export const stockProfiles = {
	standard: {label: "📜standard", bindings},

	xinput: {label: "🎮xinput", bindings: asBindings<typeof bindings>({
		spectator: {
			spawn: "gamepad.button.any",
		},
		robot: {
			primary: "gamepad.axis.7",
			secondary: "gamepad.axis.8",
			sprint: "gamepad.button.11",
			use: "gamepad.button.6",
			drop: "gamepad.button.5",
			move_up: "gamepad.axis.2.pos",
			move_down: "gamepad.axis.2.neg",
			move_left: "gamepad.axis.1.pos",
			move_right: "gamepad.axis.1.neg",
			look_up: "gamepad.axis.6.pos",
			look_down: "gamepad.axis.6.neg",
			look_left: "gamepad.axis.5.pos",
			look_right: "gamepad.axis.5.neg",
		},
	})},

	micro: {label: "🦠micro", bindings: asBindings<typeof bindings>({
		spectator: {
			spawn: "gamepad.button.any",
		},
		robot: {
			primary: "gamepad.button.20",
			secondary: "gamepad.button.3",
			sprint: "gamepad.button.19",
			use: "gamepad.button.1",
			drop: "gamepad.button.2",
			move_up: "gamepad.axis.2.pos",
			move_down: "gamepad.axis.2.neg",
			move_left: "gamepad.axis.1.pos",
			move_right: "gamepad.axis.1.neg",
			look_up: "gamepad.axis.2.pos",
			look_down: "gamepad.axis.2.neg",
			look_left: "gamepad.axis.1.pos",
			look_right: "gamepad.axis.1.neg",
		},
	})},
} satisfies Record<string, Profile>

