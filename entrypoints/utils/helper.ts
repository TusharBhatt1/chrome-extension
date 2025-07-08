export async function getUserInfo() {
	try {
		const res = await fetch("https://app.cal.com/api/auth/session");
		const data = await res.json();
		return data;
	} catch (err) {
		console.error("getUserInfo error:", err);
		return null;
	}
}
