
import {Art} from "./types.js"

export const artManifest = {
	indicator: new Art("indicator", "neutral", 2),

	gSquare: new Art("g-square", null, 128),
	gFloor: new Art("g-floor", null, 64),
	gWall: new Art("g-wall", null, 64),

	pylon: new Art("pylon", "neutral", 8),
	pylon_t1: new Art("pylon", "t1", 8),
	pylon_t2: new Art("pylon", "t2", 8),

	spawn: new Art("spawn", "neutral", 16),
	spawn_t1: new Art("spawn", "t1", 8),
	spawn_t2: new Art("spawn", "t2", 8),

	respawn: new Art("respawn", "neutral", 16),
	respawn_t1: new Art("respawn", "t1", 8),
	respawn_t2: new Art("respawn", "t2", 8),

	plasmabox_t1: new Art("plasmabox", "t1", 64),
	plasmabox_t2: new Art("plasmabox", "t2", 64),

	robotQuadcar: new Art("robot-quadcar", "neutral", 16),
	robotQuadcar_t1: new Art("robot-quadcar", "t1", 16),
	robotQuadcar_t2: new Art("robot-quadcar", "t2", 16),

	turretBase: new Art("turret-base", "neutral", 16),
	turretBase_t1: new Art("turret-base", "t1", 16),
	turretBase_t2: new Art("turret-base", "t2", 16),

	turretCannon: new Art("turret-cannon", "neutral", 32),
	turretCannon_t1: new Art("turret-cannon", "t1", 32),
	turretCannon_t2: new Art("turret-cannon", "t2", 32),

	projectileBeam: new Art("projectile-beam", "neutral", 64),
	projectileBeam_t1: new Art("projectile-beam", "t1", 64),
	projectileBeam_t2: new Art("projectile-beam", "t2", 64),

	projectilePulse: new Art("projectile-pulse", "neutral", 64),
	projectilePulse_t1: new Art("projectile-pulse", "t1", 64),
	projectilePulse_t2: new Art("projectile-pulse", "t2", 64),
}

