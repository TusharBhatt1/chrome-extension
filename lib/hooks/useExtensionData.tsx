import { useEffect, useState } from "react";
import { fetchBookings, fetchEventTypes, getUserInfo } from "../actions";

export default function useExtensionData() {
	const [userData, setUserData] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getUserInfo().then((data) => {
			setUserData(data);
			setIsLoading(false);
		});
		fetchBookings().then((data) => console.log(data)).catch((e)=>console.log(e))
	}, []);

	return { userData, isLoading };
}
