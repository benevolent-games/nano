
export type Sys<Params extends any[]> = {
	name: string
	fn: (...params: Params) => () => void
}

export type SysStats = {
	name: string
	ms: number
}

export function sys<Params extends any[]>(name: string, fn: (...params: Params) => () => void) {
	return {name, fn} as Sys<Params>
}

export function systematize<Params extends any[]>(syslist: Sys<Params>[]) {
	const stats: SysStats[] = []
	const fns: Sys<Params>["fn"][] = []
	for (const sys of syslist) {
		const stat = {name: sys.name, ms: 0}
		stats.push(stat)
		fns.push((...params) => {
			const fn = sys.fn(...params)
			return () => {
				const start = performance.now()
				fn()
				stat.ms = performance.now() - start
			}
		})
	}
	return {stats, fns}
}

