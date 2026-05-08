
import {css} from "lit"
export default css`

.shell {
	display: flex;
	height: 100%;
}

.perspective {
	position: relative;
	flex: 1 1 0;
}

canvas {
	display: block;
	width: 100%;
	height: 100%;
	background: #000;

	&:focus {
		outline: none;
	}
}

.stats {
	pointer-events: none;
	position: absolute;
	top: 0;

	opacity: 0.4;
	padding: var(--pad);

	font-family: monospace;
	font-weight: bold;
	font-size: 1em;

	background: #0008;
	text-shadow: none;
	border-radius: 0 0 var(--radius) 0;
}

`

