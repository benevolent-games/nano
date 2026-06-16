
import {asBindings} from "@benev/tact"

export const bindings = asBindings({
	meta: {
		menu: ["or", "KeyT", "Esc", "Tab"],
	},

	spectator: {
		spawn: "keyboard.any",
	},

	mech: {
		action1: ["or", "Space", "pointer.button.left"],
		action2: ["or", "Semicolon", "pointer.button.right"],
		action3: ["or", "KeyU", "pointer.button.4", "pointer.button.middle"],
		action4: ["or", "KeyO", "pointer.button.5"],

		/** boost to move faster */
		sprint: "ShiftLeft",

		/** pickup an item */
		pickup: "KeyE",

		/** drop a cargo item */
		drop: "KeyQ",

		/** use or equip an item */
		use: "KeyF",

		/** drop an equipment */
		unequip: "KeyG",

		move_up: "KeyW",
		move_down: "KeyS",
		move_left: "KeyA",
		move_right: "KeyD",

		look_up: "KeyI",
		look_down: "KeyK",
		look_left: "KeyJ",
		look_right: "KeyL",
	},
})

