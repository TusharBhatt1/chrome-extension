import { useEffect, useState } from "react";
import { fetchEventTypes, getUserInfo } from "../actions";

export default function useExtensionData() {
	const [userData, setUserData] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getUserInfo().then((data) => {
			//@ts-expect-error will fix later
			setUserData(data?.user);
			setIsLoading(false);
		});
		fetchEventTypes().then((data)=>console.log(data))
	}, []);

	return { userData, isLoading };
}
