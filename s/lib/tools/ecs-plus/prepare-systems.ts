
export function prepareSystems<Context>(
		chapters: Record<string, Record<string, (pod: Context) => () => void>>,
	) {

	return (context: Context) => {
		const fns: (() => void)[] = []

		for (const [_chapter, sections] of Object.entries(chapters))
			for (const [_section, fn] of Object.entries(sections))
				fns.push(fn(context))

		return () => fns.forEach(fn => fn())
	}
}

