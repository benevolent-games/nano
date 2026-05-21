
// import {Rand} from "@e280/stz"
// import {degrees, Vec2} from "@benev/math"
// import {ItemName} from "../parts/ctypes.js"
// import {GameComponents} from "../parts/components.js"
// import {consts} from "../../../consts.js"
//
// export const itemize = (rand: Rand, item: ItemName) => (position: Vec2): Partial<GameComponents> => ({
// 	targetable: true,
// 	inventoryItem: item,
// 	position: position.array(),
// 	size: [consts.robotScale, consts.robotScale],
// 	rotation: rand.range(degrees(0), degrees(360)),
// })
//
// export const equipmentize = (rand: Rand, item: ItemName, equippable: GameComponents["equippable"]) => (position: Vec2): Partial<GameComponents> => ({
// 	equippable,
// 	...itemize(rand, item)(position),
// })

