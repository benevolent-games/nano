
import "./renderer/babylon-side-effects.js"

import {dom} from "@e280/sly"
import {setupDeck} from "./parts/setup-deck.js"
import {NanoApp} from "./views/nano-app/element.js"

const {deck} = await setupDeck()

dom.register({NanoApp: NanoApp(deck)})

