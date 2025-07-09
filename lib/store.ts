export const userStore = storage.defineItem<User | null>("local:user-info", {
	fallback: null,
});
export const bookingsStore = storage.defineItem<any[]>("local:bookings", {
	fallback: [],
});

export async function setUserInfo(user: User) {
	return await userStore.setValue(user);
}
export async function setBookings(bookings: any[]) {
	return await bookingsStore.setValue(bookings);
}
