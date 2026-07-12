
import {Art} from "../buddy/art/art.js"
import {teamArt} from "./utils/team-art.js"

export const artwork = {
	gSquare: Art.new("g-square", 256),
	gFloor: Art.new("g-floor", 256),
	gWall: Art.new("g-wall", 256),
	gRubble: Art.new("g-rubble", 256),
	beam: teamArt("beam", 64),
	indicator: teamArt("indicator", 64),
	plasmabox: teamArt("plasmabox", 64),
	pulse: teamArt("pulse", 64),
	pylon: teamArt("pylon", 64),
	respawn: teamArt("respawn", 64),
	robotQuad: teamArt("robot-quad", 64),
	spawn: teamArt("spawn", 64),
	turretBase: teamArt("turret-base", 64),
	turretCannon: teamArt("turret-cannon", 64),
}

