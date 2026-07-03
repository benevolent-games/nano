
import {degrees, Vec2} from "@benev/math"
import {GameComponents} from "../parts/components.js"

export const defaultCamSettings = (): GameComponents["cam"] => ({
	focal: new Vec2(32, 32).tuple(),
	zoom: 8,
	tilt: degrees(10),
	swivel: degrees(0),
	fov: degrees(60),
	lerp: 5 / 100,
})

