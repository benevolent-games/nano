
import { artwork } from "../artwork.js"
import {Realm} from "../realm.js"

export const render_grid = (realm: Realm) => {
	realm.figures.create(artwork.gSquare)
	return () => {}
}

