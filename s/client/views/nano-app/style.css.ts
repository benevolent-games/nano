
import {css} from "lit"
export default css`

:host {
	display: block;
	width: 100%;
	height: 100%;
	position: absolute;
}

.homeplate {
	display: flex;
	flex-direction: column;
	gap: var(--space);

	nav {
		font-size: 2em;
		display: flex;
		justify-content: center;
		gap: var(--pad);
	}

	[view="desk"] {
		display: flex;
		justify-content: center;
		padding: var(--pad);
		background: #0004;
	}
}

`

