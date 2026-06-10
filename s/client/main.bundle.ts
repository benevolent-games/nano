
import "./renderer/babylon-side-effects.js"
import {setupBenev} from "@benev/web"

import {dom} from "@e280/sly"
import {NanoApp} from "./views/nano-app/element.js"

const benev = await setupBenev()

dom.register({...benev.elements, NanoApp})

