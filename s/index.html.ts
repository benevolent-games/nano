
import {template, html, dataSvgEmoji, socialCard} from "@e280/scute"

export default template(import.meta.url, async orb => html`
	<!doctype html>
	<html>
		<head>
			<title>nano</title>
			<link rel="icon" href="${dataSvgEmoji("🔬")}"/>

			<meta charset="utf-8"/>
			<meta name="viewport" content="width=device-width,initial-scale=1"/>
			<meta name="darkreader-lock"/>

			<style data-theme>${orb.inject("client/styles/layers.css")}</style>
			<style data-theme>${orb.inject("client/styles/vars.css")}</style>
			<style data-theme>${orb.inject("client/styles/basics.css")}</style>
			<style>${orb.inject("client/styles/page.css")}</style>

			<script type="module" src="${orb.hashurl("client/main.bundle.min.js")}"></script>

			${socialCard({
				title: "nano",
				description: "a little game",
				themeColor: "#307ba0",
			})}
		</head>
		<body>
			<nano-app>
				<h1>🔬 nano</h1>
				<p>v${orb.packageVersion()}</p>
			</nano-app>
		</body>
	</html>
`)

