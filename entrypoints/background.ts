export default defineBackground(() => {
	// background.ts
	chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
		if (msg.type === "GET_SESSION") {
			fetch("https://app.cal.com/api/auth/session", {
				credentials: "include",
			})
				.then((res) => res.json())
				.then((data) => sendResponse(data))
				.catch((err) => sendResponse({ error: err.message }));

			return true; // keep the message channel open for async sendResponse
		}
	});
});
