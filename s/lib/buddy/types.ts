
import type {DirectionalLight, HemisphericLight, LightBase, Mesh, PointLight, SceneNode, SpotLight, TransformNode} from "@babylonjs/lite"

export type AnyCanvas = HTMLCanvasElement | OffscreenCanvas
export type Prop = Mesh | TransformNode
export type Entity = SceneNode | LightBase
export type Light = PointLight | SpotLight | DirectionalLight | HemisphericLight

