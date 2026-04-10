
import {debounce} from "@e280/stz"
import {useLifecycle} from "@e280/sly"

export function useCanvas(onResize?: (canvas: HTMLCanvasElement, rect: DOMRect) => void) {
	return useLifecycle(() => {
		const canvas = document.createElement("canvas")

		const resize = debounce(100, () => {
			const rect = canvas.getBoundingClientRect()
			canvas.width = rect.width
			canvas.height = rect.height
			onResize?.(canvas, rect)
		})

		resize()
		const observer = new ResizeObserver(resize)
		observer.observe(canvas)

		return [canvas, () => observer.disconnect()]
	})
}

