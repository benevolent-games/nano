
import {Realm} from "../realm.js"

export const update_timing = (realm: Realm) => () => {
	realm.timing.update()
}

