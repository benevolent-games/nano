
import {Change} from "@benev/archimedes"
import {Space} from "../parts/space.js"
import {sys} from "../../tools/ecs-plus/sys.js"
import {GameComponents} from "../parts/components.js"

export const gsys = sys<[space: Space, change: Change<GameComponents>]>

