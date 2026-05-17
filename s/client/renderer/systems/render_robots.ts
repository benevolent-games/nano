// TODO
//
// import {Vec3} from "@benev/math"
// import {lifecycle} from "@benev/archimedes"
// import {Realm} from "../parts/realm.js"
// import {consts} from "../../../consts.js"
// import {Robolocation} from "../utils/robolocation.js"
//
// export const render_robots = (realm: Realm) => lifecycle(
// 	realm.entities,
// 	["position", "graphic", "rotation", "lerp"],
//
// 	(_id, components) => {
// 		const robolocation = new Robolocation(components)
// 		const [graphic, release] = realm.pools.chassis.lease()
// 		graphic.setScale(Vec3.all(consts.robotScale))
//
// 		return {
// 			tick(components) {
// 				robolocation.update(realm.timing.delta, components)
// 				graphic.setGridspace(robolocation.position, 0)
// 				graphic.setRotation(robolocation.rotation.x)
// 			},
//
// 			exit() {
// 				release()
// 			},
// 		}
// 	},
// )
//
