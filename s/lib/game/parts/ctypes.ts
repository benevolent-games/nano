
export type ToolKind = "cannon" | "drill"

export type ItemKind =
	| ToolKind
	| "carbon"
	| "battery"

export type Tools = {
	primary: null | ToolKind
	secondary: null | ToolKind
}

