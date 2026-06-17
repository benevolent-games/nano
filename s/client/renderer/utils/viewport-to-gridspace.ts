
import {map, Vec2, Vec3, Xy} from "@benev/math"
import {Vector3} from "@babylonjs/core/Maths/math.vector.js"
import {Camera} from "@babylonjs/core/Cameras/camera.pure.js"
import {unresolvePosition} from "./resolve.js"

export function viewportToGridspace(camera: Camera, {x, y}: Xy) {
	const ivp = camera
		.getViewMatrix()
		.multiply(camera.getProjectionMatrix())
		.invert()

	const nx = map(x, -1, 1)
	const ny = map(y, 1, -1)

	const near = Vec3.from(Vector3.TransformCoordinates(new Vector3(nx, ny, 0), ivp))
	const far = Vec3.from(Vector3.TransformCoordinates(new Vector3(nx, ny, 1), ivp))

	const dir = far.sub(near).normalize()
	if (Math.abs(dir.y) < 1e-5)
		return

	const t = (-near.y) / dir.y
	if (t < 0)
		return

	const hit = unresolvePosition(near.add(dir.scale(t)))
	return new Vec2(hit.x, hit.y)
}

