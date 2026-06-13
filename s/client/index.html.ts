
import {benevCssText} from "@benev/web/ssg"
import {template, html, socialCard} from "@e280/scute"

export default template(import.meta.url, async orb => html`
	<!doctype html>
	<html benev>
		<head>
			<meta charset="utf-8"/>
			<meta name="viewport" content="width=device-width,initial-scale=1"/>
			<meta name="darkreader-lock"/>

			<title>nano</title>
			<link rel="icon" href="${orb.hashurl('/assets/favicon.png')}"/>
			<script type="module" src="${orb.hashurl("main.bundle.min.js")}"></script>

			<style data-theme>
				@layer benev, vars, x, app;
				@layer app {
					:root, :host {
						color: #aaa;
						background: #000;
					}
				}
				${html.raw(benevCssText)}
				${orb.inject("css/vars.css")}
				${orb.inject("css/x.css")}
				${orb.inject("css/app.css")}
			</style>

			${socialCard({
				title: "nano",
				description: "a little game",
				themeColor: "#307ba0",
			})}
		</head>
		<body>
			<benev-menu></benev-menu>

			<benev-header>
				<a href="https://discord.gg/BnZx2utdev">discord</a>
				<a href="https://github.com/benev-gg/nano">github</a>
				<a href="https://benev.gg/">benev.gg</a>
			</benev-header>

			<benev-loader>
				<main x-spacious>
					<section class=plate benev-slice>
						<header>
							<h1><img src="${orb.hashurl('/assets/nano.webp')}" alt="nano"/></h1>
							<p class=subtitle>robot warfare online</p>
							<p class=version>v${orb.packageVersion()}</p>
						</header>
						<button id=play benev-button=juicy>play game</button>
						<button id=edit benev-button=chill>map editor</button>
					</section>
				</main>
			</benev-loader>
		</body>
	</html>
`)

