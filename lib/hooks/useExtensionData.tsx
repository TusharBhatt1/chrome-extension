import { useEffect, useState } from "react";
import { getUserInfo } from "../actions";

export default function useExtensionData() {
	const [userData, setUserData] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getUserInfo().then((data) => {
			setUserData(data.user);
			setIsLoading(false);
		});
	}, []);

	return { userData, isLoading };
}
