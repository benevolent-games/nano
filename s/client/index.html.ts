
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

			<div class=superplate>
				<benev-loader>
					hello
				</benev-loader>
			</div>
		</body>
	</html>
`)

// export default template(import.meta.url, async orb => html`
// 	<!doctype html>
// 	<html>
// 		<head>
// 			<title>nano</title>
// 			<link rel="icon" href="${orb.hashurl('/assets/favicon.png')}"/>
//
// 			<meta charset="utf-8"/>
// 			<meta name="viewport" content="width=device-width,initial-scale=1"/>
// 			<meta name="darkreader-lock"/>
//
// 			<style data-theme>${orb.inject("styles/layers.css")}</style>
// 			<style data-theme>${orb.inject("styles/vars.css")}</style>
// 			<style data-theme>${orb.inject("styles/basics.css")}</style>
// 			<style>${orb.inject("styles/page.css")}</style>
//
// 			<script type="module" src="${orb.hashurl("main.bundle.min.js")}"></script>
//
// 			${socialCard({
// 				title: "nano",
// 				description: "a little game",
// 				themeColor: "#307ba0",
// 			})}
// 		</head>
// 		<body>
// 			<nano-app>
// 				<section class=plate>
// 					<header class=slice>
// 						<a href="https://benev.gg/" title="benev.gg">
// 							<img src="/assets/b.png" alt="b"/>
// 						</a>
//
// 						<a href="https://discord.gg/BnZx2utdev">
// 							discord
// 						</a>
//
// 						<a href="https://github.com/benev-gg/nano">
// 							github
// 						</a>
// 					</header>
//
// 					<div class="lead slice">
// 						<h1><img src="${orb.hashurl('/assets/nano.webp')}" alt="nano"/></h1>
// 						<p>v${orb.packageVersion()}</p>
// 					</div>
// 				</section>
// 			</nano-app>
// 		</body>
// 	</html>
// `)

