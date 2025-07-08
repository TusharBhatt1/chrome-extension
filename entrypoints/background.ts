import { CHROME_MESSAGE_TYPE } from "@/constant";

export default defineBackground(() => {
	// background.ts
	chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
		if (msg.type === CHROME_MESSAGE_TYPE.USER_DATA) {
			fetch("https://app.cal.com/api/auth/session", {
				credentials: "include",
			})
				.then((res) => res.json())
				.then((data) => sendResponse(data.user))
				.catch((err) => sendResponse({ error: err.message }));

			return true; // keep the message channel open for async sendResponse
		}

		if (msg.type === CHROME_MESSAGE_TYPE.EVENT_TYPES) {
			fetch(
				"https://app.cal.com/api/trpc/eventTypes/getEventTypesFromGroup,getEventTypesFromGroup?batch=1&input=%7B%220%22%3A%7B%22json%22%3A%7B%22limit%22%3A10%2C%22group%22%3A%7B%22teamId%22%3Anull%2C%22parentId%22%3Anull%7D%7D%7D%2C%221%22%3A%7B%22json%22%3A%7B%22limit%22%3A10%2C%22searchQuery%22%3A%22%22%2C%22group%22%3A%7B%22teamId%22%3Anull%2C%22parentId%22%3Anull%7D%7D%2C%22meta%22%3A%7B%22values%22%3A%7B%22group.parentId%22%3A%5B%22undefined%22%5D%7D%7D%7D%7D",
				{
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
				.then((res) => res.json())
				.then((data) => sendResponse(data))
				.catch((err) => sendResponse({ error: err.message }));

			return true; // keep the message channel open for async sendResponse
		}
	});
});
