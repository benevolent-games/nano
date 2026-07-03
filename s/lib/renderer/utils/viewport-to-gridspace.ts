
import {unresolvePosition} from "./resolve.js"
import {lerp, Mat4, Vec2, Vec3, Xy} from "@benev/math"
import {Camera, getViewProjectionMatrix} from "@babylonjs/lite"

export function viewportToGridspace(camera: Camera, aspectRatio: number, {x, y}: Xy) {
	const ivp = new Mat4(new Float32Array(getViewProjectionMatrix(camera, aspectRatio))).invert()

	const nx = lerp(x, -1, 1)
	const ny = lerp(y, 1, -1)

	const near = ivp.transformPoint(new Vec3(nx, ny, 0))
	const far = ivp.transformPoint(new Vec3(nx, ny, 1))

	const dir = far.sub(near).normalize()
	if (Math.abs(dir.y) < 1e-5)
		return

	const t = (-near.y) / dir.y
	if (t < 0)
		return

	const hit = unresolvePosition(near.add(dir.scale(t)))
	return new Vec2(hit.x, hit.y)
}

