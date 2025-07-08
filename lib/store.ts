export const userStore = storage.defineItem<User | null>("local:user-info", {
	fallback: null,
});
export async function setUserInfo(user: User) {
	return await userStore.setValue(user);
}

