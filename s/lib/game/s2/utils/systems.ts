
import {Weave} from "../weave.js"

export function systems(
		chapters: Record<string, Record<string, (weave: Weave) => () => void>>,
	) {

	return (weave: Weave) => {
		const fns: (() => void)[] = []

		for (const [_chapter, sections] of Object.entries(chapters))
			for (const [_section, fn] of Object.entries(sections))
				fns.push(fn(weave))

		return () => fns.forEach(fn => fn())
	}
}

