
import {template, html, socialCard} from "@e280/scute"

export default template(import.meta.url, async orb => html`
	<!doctype html>
	<html>
		<head>
			<title>nano</title>
			<link rel="icon" href="${orb.hashurl('/assets/favicon.png')}"/>

			<meta charset="utf-8"/>
			<meta name="viewport" content="width=device-width,initial-scale=1"/>
			<meta name="darkreader-lock"/>

			<style data-theme>${orb.inject("styles/layers.css")}</style>
			<style data-theme>${orb.inject("styles/vars.css")}</style>
			<style data-theme>${orb.inject("styles/basics.css")}</style>
			<style>${orb.inject("styles/page.css")}</style>

			<script type="module" src="${orb.hashurl("main.bundle.min.js")}"></script>

			${socialCard({
				title: "nano",
				description: "a little game",
				themeColor: "#307ba0",
			})}
		</head>
		<body>
			<nano-app>
				<section class=plate>
					<header class=slice>
						<a href="https://benev.gg/" title="benev.gg">
							<img src="/assets/b.png" alt="b"/>
						</a>

						<a href="https://discord.gg/BnZx2utdev">
							discord
						</a>

						<a href="https://github.com/benev-gg/nano">
							github
						</a>
					</header>

					<div class="lead slice">
						<h1><img src="${orb.hashurl('/assets/nano.webp')}" alt="nano"/></h1>
						<p>v${orb.packageVersion()}</p>
					</div>
				</section>
			</nano-app>
		</body>
	</html>
`)

