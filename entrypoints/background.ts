import { CHROME_MESSAGE_TYPE } from "@/constant";
import { URLs, PAYLOADS } from "@/lib/urls-and-payloads";

export default defineBackground(() => {
	chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
		if (msg.type === CHROME_MESSAGE_TYPE.GET_USER_SESSION) {
			fetch(URLs.USER_SESSION, {
				credentials: "include",
			})
				.then((res) => res.json())
				.then((data) => sendResponse(data.user))
				.catch((err) => sendResponse({ error: err.message }));

			return true; // keep the message channel open for async sendResponse
		}

		if (msg.type === CHROME_MESSAGE_TYPE.GET_EVENT_TYPES) {
			fetch(
				`${URLs.EVENT_TYPES}&input=${encodeURIComponent(
					JSON.stringify(PAYLOADS.EVENT_TYPES)
				)}`,
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

			return true;
		}
		if (msg.type === CHROME_MESSAGE_TYPE.GET_UPCOMING_BOOKINGS) {
			fetch(
				`${URLs.BOOKINGS}&input=${encodeURIComponent(
					JSON.stringify(PAYLOADS.UPCOMING_BOOKINGS)
				)}`,
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

			return true;
		}
		if (msg.type === CHROME_MESSAGE_TYPE.GET_PAST_BOOKINGS) {
			fetch(
				`${URLs.BOOKINGS}&input=${encodeURIComponent(
					JSON.stringify(PAYLOADS.PAST_BOOKINGS)
				)}`,
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

			return true;
		}
	});
});
