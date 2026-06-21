
import {Vec3} from "@benev/math"
import {EngineContext, Mesh, SceneNode} from "@babylonjs/lite"
import {AssetDepot} from "../buddy/depot.js"
import {Artwork} from "../buddy/artsy/artwork.js"
import {superclone} from "../buddy/superclone.js"
import {getMeshes} from "../buddy/utils/get-meshes.js"
import {meshRecolor} from "../buddy/utils/mesh-recolor.js"

const magicColor = new Vec3(1, 0, 0)
const neutral = new Vec3(.8, .8, .8)
const t1 = new Vec3(0, .2, .9)
const t2 = new Vec3(.9, .2, 0)

export type ArtContext = {
	engine: EngineContext
	depot: AssetDepot
}

export const artwork = Artwork.using<ArtContext>()(art => ({
	gSquare: art(256, c => c.depot.prop("g-square")),
	gFloor: art(256, c => c.depot.prop("g-floor")),
	gWall: art(256, d => d.depot.prop("g-wall")),

	pylon: {
		neutral: art(128, c => cloneAndRecolor(c.engine, c.depot.prop("pylon"), neutral)),
		t1: art(128, c => cloneAndRecolor(c.engine, c.depot.prop("pylon"), t1)),
		t2: art(128, c => cloneAndRecolor(c.engine, c.depot.prop("pylon"), t2)),
	},
}))

function cloneAndRecolor(engine: EngineContext, prop: Mesh | SceneNode, newColor: Vec3) {
	const clone = superclone(engine, prop)
	for (const mesh of getMeshes(clone))
		meshRecolor(engine, mesh, magicColor, newColor)
	return clone
}

