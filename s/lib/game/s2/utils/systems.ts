
import {Pod} from "../pod.js"

export function systems(
		chapters: Record<string, Record<string, (pod: Pod) => () => void>>,
	) {

	return (pod: Pod) => {
		const fns: (() => void)[] = []

		for (const [_chapter, sections] of Object.entries(chapters))
			for (const [_section, fn] of Object.entries(sections))
				fns.push(fn(pod))

		return () => fns.forEach(fn => fn())
	}
}

