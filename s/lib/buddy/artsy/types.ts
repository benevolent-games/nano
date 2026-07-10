
import {Art} from "./art.js"
import {Prop} from "../types.js"

export type ArtFn<Context> = (
	capacity: number,
	resolve: (context: Context) => Prop,
) => Art<Context>

