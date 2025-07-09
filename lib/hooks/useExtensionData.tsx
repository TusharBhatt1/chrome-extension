import { useEffect, useState } from "react";
import { fetchBookings, getUserInfo } from "../actions";
import { extractJson } from "../utils";
import { Booking, User } from "../types";

export default function useExtensionData() {
	const [userData, setUserData] = useState<User | null>(null);
	const [bookings, setBookings] = useState<Booking[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadData = async () => {
			try {
				const user = await getUserInfo();
				setUserData(user);
			} catch (err) {
				console.error("Failed to fetch user info:", err);
			} finally {
				setIsLoading(false);
			}

			try {
				const data = await fetchBookings();
				//@ts-expect-error will fix later
				const { bookings } = extractJson<{ bookings: Booking[] }>(data) || {};

				setBookings(bookings || null);
			} catch (err) {
				console.error("Failed to fetch bookings:", err);
			}
		};

		loadData();
	}, []);

	return { userData, isLoading, bookings, setBookings };
}
