import { Booking, User } from "./types";

export const userStore = storage.defineItem<User | null>("local:user-info", {
	fallback: null,
});
export const upcomingBookingsStore = storage.defineItem<Booking[] | null>(
	"local:upcomingBookings",
	{
		fallback: null,
	}
);

export const pastBookingsStore = storage.defineItem<Booking[] | null>(
	"local:pastBookings",
	{
		fallback: null,
	}
);

export async function setUserInfo(user: User) {
	return await userStore.setValue(user);
}
export async function setUpcomingBookings(bookings: Booking[]) {
	return await upcomingBookingsStore.setValue(bookings);
}
export async function setPastBookings(bookings: Booking[]) {
	return await pastBookingsStore.setValue(bookings);
}
