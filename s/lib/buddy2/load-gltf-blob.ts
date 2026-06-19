
import {loadGltf, EngineContext} from "@babylonjs/lite"

export async function loadGltfBlob(engine: EngineContext, blob: Blob) {
	const url = URL.createObjectURL(blob)
	try {
		return await loadGltf(engine, url)
	}
	finally {
		URL.revokeObjectURL(url)
	}
}

