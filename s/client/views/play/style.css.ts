
import {css} from "lit"
export default css`

:host {
	position: relative;
	display: flex;
	flex-direction: column;
	height: 100%;
	min-height: 0;
	overflow: hidden;
}

canvas {
	flex: 1 1 auto;
	display: block;
	width: 100%;
	min-height: 0;
	background: #000;
}

.stats {
	pointer-events: none;
	position: absolute;
	top: 0;

	padding: var(--pad);

	font-family: monospace;
	font-weight: bold;
	font-size: 1.4em;
}

`

