
import "./renderer/babylon-side-effects.js"
import {dom} from "@e280/sly"
import {Basis} from "./types.js"
import {NanoApp} from "./views/nano-app/element.js"

export default async(basis: Basis) => {
	dom.register({NanoApp})
}

