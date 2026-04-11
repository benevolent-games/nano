
import {asBindings} from "@benev/tact/core"

export type GameBindings = typeof gameBindings

export const gameBindings = asBindings({
	control: {
		move_up: "KeyW",
		move_down: "KeyS",
		move_left: "KeyA",
		move_right: "KeyD",
		look_up: "KeyI",
		look_down: "KeyK",
		look_left: "KeyJ",
		look_right: "KeyL",
		primary: "Space",
		secondary: "Semicolon",
		sprint: "ShiftLeft",
	},
})

