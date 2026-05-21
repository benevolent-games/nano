
import {Rand} from "@e280/stz"
import {degrees, Vec2} from "@benev/math"
import {Item} from "../parts/ctypes.js"
import {GameComponents} from "../parts/components.js"
import {consts} from "../../../consts.js"

export const itemize = (rand: Rand, item: Item) => (position: Vec2): Partial<GameComponents> => ({
	targetable: true,
	pickupable: item,
	position: position.array(),
	size: [consts.robotScale, consts.robotScale],
	rotation: rand.range(degrees(0), degrees(360)),
})

export const equipmentize = (rand: Rand, item: Item, equippable: GameComponents["equippable"]) => (position: Vec2): Partial<GameComponents> => ({
	equippable,
	...itemize(rand, item)(position),
})

