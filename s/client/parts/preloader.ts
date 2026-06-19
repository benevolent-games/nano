
import {once} from "@e280/stz"

export class Preloader {
	constructor(public url: string | URL) {}

	loadBuffer = once(
		async() => (await fetch(this.url)).arrayBuffer()
	)

	loadObjectUrl = once(
		async() => {
			const buffer = await this.loadBuffer()
			const blob = new Blob([buffer])
			return URL.createObjectURL(blob)
		}
	)
}

