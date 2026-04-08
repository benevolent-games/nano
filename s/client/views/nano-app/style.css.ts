
import {css} from "lit"
export default css`

:host {
	width: 100%;
	height: 100%;
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
}

`

