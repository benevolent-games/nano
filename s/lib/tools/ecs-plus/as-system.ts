
export function asSystem<Context>(fn: (context: Context) => () => void) {
	return fn
}

