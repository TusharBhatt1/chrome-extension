import { useEffect, useState } from "react";
import { fetchBookings, fetchUserInfo } from "../actions";
import { extractJson } from "../utils";
import { Booking, User } from "../types";

export default function useExtensionData() {
	const [userData, setUserData] = useState<User | null>(null);
	const [upcomingBookings, setUpcomingBookings] = useState<Booking[] | null>(null);
	const [pastBookings, setPastBookings] = useState<Booking[] | null>(null);
	const [isLoadingUpcoming, setIsLoadingUpcoming] = useState(true);
	const [isLoadingPast, setIsLoadingPast] = useState(true);
	const [showUpcomingBookings, setShowUpcomingBookings] = useState(true);

	useEffect(() => {
		const loadUserData = async () => {
			try {
				const cache = await fetchUserInfo((fresh) => {
					if (fresh) setUserData(fresh);
				});
				setUserData(cache);
			} catch (err) {
				console.error("Failed to fetch user info:", err);
			} finally {
			}
		};
		loadUserData();
	}, []);

	// Upcoming bookings
	useEffect(() => {
		const loadUpcoming = async () => {
			setIsLoadingUpcoming(true);
			try {
				const data = await fetchBookings(
					"upcoming",
					(freshData) => {
						const { bookings } = extractJson<{ bookings: Booking[] }>(Array.isArray(freshData) ? freshData : []) || {};
						setUpcomingBookings(bookings || null);
					}
				);
				const { bookings } = extractJson<{ bookings: Booking[] }>(Array.isArray(data) ? data : []) || {};
				setUpcomingBookings(bookings || null);
			} catch (err) {
				console.error("Failed to fetch upcoming bookings:", err);
			} finally {
				setIsLoadingUpcoming(false);
			}
		};
		loadUpcoming();
	}, []);

	// Past bookings
	useEffect(() => {
		const loadPast = async () => {
			setIsLoadingPast(true);
			try {
				const data = await fetchBookings(
					"past",
					(freshData) => {
						const { bookings } = extractJson<{ bookings: Booking[] }>(Array.isArray(freshData) ? freshData : []) || {};
						setPastBookings(bookings || null);
					}
				);
				const { bookings } = extractJson<{ bookings: Booking[] }>(Array.isArray(data) ? data : []) || {};
				setPastBookings(bookings || null);
			} catch (err) {
				console.error("Failed to fetch past bookings:", err);
			} finally {
				setIsLoadingPast(false);
			}
		};
		loadPast();
	}, []);

	const bookings = showUpcomingBookings ? upcomingBookings : pastBookings;
	const isLoading = showUpcomingBookings ? isLoadingUpcoming : isLoadingPast;
	const setBookings = showUpcomingBookings ? setUpcomingBookings : setPastBookings;

	return {
		userData,
		isLoading,
		bookings,
		setBookings,
		showUpcomingBookings,
		setShowUpcomingBookings,
	};
}
