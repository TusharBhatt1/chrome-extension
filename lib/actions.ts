const LOCAL_STORAGE_KEY = "cal_user_info";

export async function getUserInfo() {
	let cachedData: any = null;

	try {
		const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (stored) {
			cachedData = JSON.parse(stored);
		}
	} catch (err) {
		console.warn("Error parsing cached user info:", err);
	}

	const freshDataPromise = fetch("https://app.cal.com/api/auth/session")
		.then(async (res) => {
			if (!res.ok) throw new Error("Session fetch failed");
			const freshData = await res.json();

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
