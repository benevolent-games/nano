
import {once} from "@e280/stz"

export const load = once(async(url: URL) => import(url.href))

