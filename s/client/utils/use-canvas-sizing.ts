
import {debounce} from "@e280/stz"
import {useMount} from "@e280/sly"

export function useCanvasSizing(canvas: HTMLCanvasElement, onResize?: (rect: DOMRect) => void) {
	useMount(() => {
		const resize = debounce(100, () => {
			const rect = canvas.getBoundingClientRect()
			canvas.width = rect.width
			canvas.height = rect.height
			onResize?.(rect)
		})

		resize()
		const observer = new ResizeObserver(resize)
		observer.observe(canvas)

		return () => observer.disconnect()
	})
}

