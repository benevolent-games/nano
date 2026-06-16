
import {degrees} from "@benev/math"
import {GameComponents} from "../parts/components.js"
import {Gridspace} from "../../../lib/gridworld/utils/gridspace.js"

export const defaultCamSettings = (): GameComponents["cam"] => ({
	focal: new Gridspace(32, 32).array(),
	zoom: 8,
	tilt: degrees(10),
	swivel: degrees(0),
	fov: degrees(60),
	lerp: 5 / 100,
})

