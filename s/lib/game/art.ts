
import {Art} from "./types.js"

export const manifest = {
	gSquare: new Art("g-square", {raw: 128}),
	gFloor: new Art("g-floor", {raw: 64}),
	gWall: new Art("g-wall", {raw: 64}),

	indicator: new Art("indicator", {neutral: 2}),
	pylon: new Art("pylon", {neutral: 8, t1: 8, t2: 8}),
	spawn: new Art("spawn", {neutral: 16, t1: 8, t2: 8}),
	respawn: new Art("respawn", {neutral: 16, t1: 8, t2: 8}),
	plasmabox: new Art("plasmabox", {t1: 64, t2: 64}),

	robotQuadcar: new Art("robot-quadcar", {neutral: 16, t1: 16, t2: 16}),
	turretBase: new Art("turret-base", {neutral: 16, t1: 16, t2: 16}),
	turretCannon: new Art("turret-cannon", {neutral: 32, t1: 32, t2: 32}),
	projectileBeam: new Art("projectile-beam", {neutral: 64, t1: 64, t2: 64}),
	projectilePulse: new Art("projectile-pulse", {neutral: 64, t1: 64, t2: 64}),
}

