
import {count} from "@e280/stz"

export type PoolMember<Item> = {
	item: Item
	enable: () => void
	disable: () => void
}

export class Pool<Item> {
	#make
	#free: PoolMember<Item>[] = []
	#used = new Set<PoolMember<Item>>()

	constructor(make: () => PoolMember<Item>) {
		this.#make = make
	}

	get size() {
		return this.#free.length + this.#used.size
	}

	prepopulate(n: number) {
		for (const _ of count(n)) {
			const member = this.#make()
			this.#free.push(member)
			member.disable()
		}
		return this
	}

	borrow() {
		const member = this.#free.pop() ?? this.#make()
		this.#used.add(member)
		member.enable()

		const release = () => {
			this.#free.push(member)
			this.#used.delete(member)
			member.disable()
		}

		return [member.item, release] as [Item, () => void]
	}
}

