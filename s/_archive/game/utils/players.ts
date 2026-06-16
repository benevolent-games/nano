
import {IntentBucket} from "@benev/tact"

export type PlayerId = string

export class Player {
	intents = new IntentBucket()
	constructor(public readonly id: PlayerId) {}
}

