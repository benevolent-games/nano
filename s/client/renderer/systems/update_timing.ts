
import {Realm} from "../parts/realm.js"

export const update_timing = (realm: Realm) => () => {
	realm.timing.update()
}

