import { useEffect, useState } from "react";
import { fetchBookings, getUserInfo } from "../actions";
import { extractJson } from "../utils";
import { Booking, User } from "../types";

export default function useExtensionData() {
	const [userData, setUserData] = useState<User | null>(null);
	const [bookings, setBookings] = useState<Booking[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [showUpcomingBookings, setShowUpcomingBookings] = useState(true);

	useEffect(() => {
		const loadUserData = async () => {
			try {
				const user = await getUserInfo();
				setUserData(user);
			} catch (err) {
				console.error("Failed to fetch user info:", err);
			} finally {
				setIsLoading(false);
			}
		};

		loadUserData();
	}, []);

	useEffect(() => {
		const loadBookings = async () => {
			console.log("calling again with: ",showUpcomingBookings)
			try {
				const data = await fetchBookings(
					showUpcomingBookings ? "upcoming" : "past"
				);
				//@ts-expect-error will fix later
				const { bookings } = extractJson<{ bookings: Booking[] }>(data) || {};

				setBookings(bookings || null);
			} catch (err) {
				console.error("Failed to fetch bookings:", err);
			}
		};
		loadBookings();
	}, [showUpcomingBookings]);

	return {
		userData,
		isLoading,
		bookings,
		setBookings,
		showUpcomingBookings,
		setShowUpcomingBookings,
	};
}
