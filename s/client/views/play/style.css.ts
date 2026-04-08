
import {css} from "lit"
export default css`

:host {
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

`

