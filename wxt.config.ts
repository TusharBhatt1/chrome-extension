import { defineConfig } from "wxt";

export default defineConfig({
	modules: ["@wxt-dev/module-react"],
	manifest: {
		name: "Cal Copilot",
		description: "This browser extension helps with Cal.com.",
		version: "0.0.1",
		icons: {
			"32": "icon/logo.png",
		},
		host_permissions: ["https://app.cal.com/*"],
		permissions: [
			"cookies",
			"storage",
			"contextMenus",
			"activeTab",
			"tabs",
			"scripting",
		],
	},
});
