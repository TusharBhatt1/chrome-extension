import { CHROME_MESSAGE_TYPE } from "@/constant";
import { userStore } from "./store";
import { Booking, User } from "./types";

async function getUserInfo(): Promise<User | null> {
	let cachedData: User | null = await userStore.getValue();

	function fetchUserDataFromBackground(): Promise<User | null> {
		return new Promise((resolve, reject) => {
			chrome.runtime.sendMessage(
				{ type: CHROME_MESSAGE_TYPE.GET_USER_SESSION },
				(response: any) => {
					if (response && !response.error) {
						resolve(response as User);
					} else {
						reject(response?.error || "Unknown error");
					}
				}
			);
		});
	}

	const freshDataPromise = fetchUserDataFromBackground()
		.then(async (freshData) => {
			if (!freshData || Object.keys(freshData).length === 0) {
				await userStore.setValue(null);
				return null;
			}

			if (JSON.stringify(freshData) !== JSON.stringify(cachedData)) {
				await userStore.setValue(freshData);
				return freshData;
			}

			return cachedData;
		})
		.catch(async (err) => {
			console.error("Error fetching user info:", err);
			await userStore.setValue(null);
			return null;
		});

	if (cachedData) {
		freshDataPromise.then(); // trigger background refresh
		return cachedData;
	} else {
		return await freshDataPromise;
	}
}

const fetchEventTypes = async () => {
	return new Promise((resolve, reject) => {
		chrome.runtime.sendMessage(
			{ type: CHROME_MESSAGE_TYPE.GET_EVENT_TYPES },
			(response: any) => {
				if (response && !response.error) {
					resolve(response);
				} else {
					reject(response?.error || "Unknown error");
				}
			}
		);
	});
};
const fetchBookings = async (
	status: "upcoming" | "past"
): Promise<{ bookings: Booking[] } | null> => {
	return new Promise((resolve, reject) => {
		chrome.runtime.sendMessage(
			{
				type:
					status === "upcoming"
						? CHROME_MESSAGE_TYPE.GET_UPCOMING_BOOKINGS
						: CHROME_MESSAGE_TYPE.GET_PAST_BOOKINGS,
			},
			(response: any) => {
				if (response && !response.error) {
					resolve(response);
				} else {
					reject(response?.error || "Unknown error");
				}
			}
		);
	});
};

export { getUserInfo, fetchEventTypes, fetchBookings };
