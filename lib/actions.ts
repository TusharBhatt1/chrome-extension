const LOCAL_STORAGE_KEY = "cal_user_info";

async function getUserInfo() {
	let cachedData: any = null;

	try {
		const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (stored) {
			cachedData = JSON.parse(stored);
		}
	} catch (err) {
		console.warn("Error parsing cached user info:", err);
	}

	function fetchSessionFromBackground() {
		return new Promise((resolve, reject) => {
			chrome.runtime.sendMessage({ type: "GET_SESSION" }, (response: any) => {
				if (response && !response.error) {
					resolve(response);
				} else {
					reject(response?.error || "Unknown error");
				}
			});
		});
	}

	const freshDataPromise = fetchSessionFromBackground()
		.then((freshData: any) => {
			// If response is empty or invalid, clear local storage and return null
			if (!freshData || Object.keys(freshData).length === 0) {
				localStorage.removeItem(LOCAL_STORAGE_KEY);
				return null;
			}

			if (JSON.stringify(freshData) !== JSON.stringify(cachedData)) {
				localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(freshData));
				return freshData;
			}

			return cachedData;
		})
		.catch((err) => {
			console.error("Error fetching user info:", err);
			localStorage.removeItem(LOCAL_STORAGE_KEY);
			return null;
		});

	if (cachedData) {
		freshDataPromise.then(); // trigger update in background
		return cachedData;
	} else {
		return await freshDataPromise;
	}
}

const fetchEventTypes = async () => {
	const url =
		"https://app.cal.com/api/trpc/eventTypes/getEventTypesFromGroup,getEventTypesFromGroup?batch=1&input=%7B%220%22%3A%7B%22json%22%3A%7B%22limit%22%3A10%2C%22group%22%3A%7B%22teamId%22%3Anull%2C%22parentId%22%3Anull%7D%7D%7D%2C%221%22%3A%7B%22json%22%3A%7B%22limit%22%3A10%2C%22searchQuery%22%3A%22%22%2C%22group%22%3A%7B%22teamId%22%3Anull%2C%22parentId%22%3Anull%7D%7D%2C%22meta%22%3A%7B%22values%22%3A%7B%22group.parentId%22%3A%5B%22undefined%22%5D%7D%7D%7D%7D";

	try {
		const res = await fetch(url, {
			credentials: "include", // needed if you're logged into Cal
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!res.ok) throw new Error("Failed to fetch event types");

		const data = await res.json();
		console.log("Fetched TRPC data:", data);
		return data;
	} catch (err) {
		console.error("Error fetching event types:", err);
		return null;
	}
};

export { getUserInfo, fetchEventTypes };
