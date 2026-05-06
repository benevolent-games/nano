
import {asBindings} from "@benev/tact"

export const bindings = asBindings({
	meta: {
		menu: ["or", "KeyT", "Esc", "Tab"],
	},

	spectator: {
		spawn: "keyboard.any",
	},

	robot: {

		/** activate primary equipment, eg shoot weapon */
		primary: "Space",

		/** activate secondary equipment, eg mining drill */
		secondary: "Semicolon",

		/** boost to move faster */
		sprint: "ShiftLeft",

		/** interact with an item in the world, eg pull a lever or pickup an item */
		use: "KeyE",

		/** drop a cargo item */
		drop: "KeyQ",

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

