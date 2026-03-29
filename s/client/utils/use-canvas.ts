
import {useLife} from "@e280/sly"
import {debounce} from "@e280/stz"

export function useCanvas() {
	return useLife(() => {
		const canvas = document.createElement("canvas")
		const resize = debounce(100, () => {
			const rect = canvas.getBoundingClientRect()
			canvas.width = rect.width
			canvas.height = rect.height
		})
		resize()
		const observer = new ResizeObserver(resize)
		observer.observe(canvas)
		return [canvas, () => observer.disconnect()]
	})
}

