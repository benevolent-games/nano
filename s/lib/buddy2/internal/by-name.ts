
export function byName<T extends {name: string}>(items: T[]) {
	const map = new Map<string, T>()
	for (const item of items) {
		if (map.has(item.name))
			throw new Error(`duplicate entity name "${item.name}"`)
		map.set(item.name, item)
	}
	return map
}

