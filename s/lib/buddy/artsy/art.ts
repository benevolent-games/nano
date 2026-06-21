
import {Prop} from "../types.js"

export class Art<Context> {
	constructor(
		public capacity: number,
		public resolve: (context: Context) => Prop,
	) {}
}

