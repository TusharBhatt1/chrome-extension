import { useEffect, useState } from "react";
import { fetchEventTypes, getUserInfo } from "../actions";

export default function useExtensionData() {
	const [userData, setUserData] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getUserInfo().then((data) => {
			setUserData(data);
			setIsLoading(false);
		});
		fetchEventTypes().then((data) => console.log(data));
	}, []);

	return { userData, isLoading };
}
