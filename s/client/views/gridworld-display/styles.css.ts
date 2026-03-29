
import {css} from "lit"
export default css`

:host {
	display: flex;
	flex-direction: column;
	height: 100%;
}

header {
	display: flex;
	gap: var(--space);
}

canvas {
	flex: 1 1 auto;
	display: block;
	width: 100%;
	background: #000;
}

`

