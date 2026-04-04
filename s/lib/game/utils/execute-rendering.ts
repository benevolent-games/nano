
import {Components, System} from "@benev/archimedes"

export function executeRendering<C extends Components>(systems: System<C>[]) {
	for (const system of systems)
		for (const _ of system()) {}
}

