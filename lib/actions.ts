import { CHROME_MESSAGE_TYPE } from "@/constant";
import { pastBookingsStore, upcomingBookingsStore, userStore } from "./store";
import { Booking, MarkShowNoShowPayload, User } from "./types";

async function fetchUserInfo(
	onUpdate?: (user: User | null) => void
): Promise<User | null> {
	const cachedData = await userStore.getValue();

	function fetchUserDataFromBackground(): Promise<User | null> {
		return new Promise((resolve, reject) => {
			chrome.runtime.sendMessage(
				{ type: CHROME_MESSAGE_TYPE.GET_USER_SESSION },
				(response: any) => {
					if (response && !response.error) {
						resolve(response as User);
					} else {
						reject(response?.error || "Unknown error");
					}
				}
			);
		});
	}

	// Begin background fetch
	fetchUserDataFromBackground()
		.then(async (freshData) => {
			if (!freshData || Object.keys(freshData).length === 0) {
				await userStore.setValue(null);
				onUpdate?.(null);
				return;
			}

			if (JSON.stringify(freshData) !== JSON.stringify(cachedData)) {
				await userStore.setValue(freshData);
				onUpdate?.(freshData); // notify change
			}
		})
		.catch(async (err) => {
			console.error("Error fetching user info:", err);
			await userStore.setValue(null);
			onUpdate?.(null);
		});

	return cachedData;
}

// Utility for deep equality
function deepEqual(a: any, b: any): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

const fetchBookings = async (
  status: "upcoming" | "past",
  onFreshData?: (freshData: Booking[] | null) => void
): Promise<Booking[] | null> => {
  const currentStore =
    status === "upcoming" ? upcomingBookingsStore : pastBookingsStore;
  const savedData = await currentStore.getValue();

  // Background fetch for fresh data
  const fetchFresh = async () => {
    return new Promise<Booking[] | null>((resolve, reject) => {
      chrome.runtime.sendMessage(
        {
          type:
            status === "upcoming"
              ? CHROME_MESSAGE_TYPE.GET_UPCOMING_BOOKINGS
              : CHROME_MESSAGE_TYPE.GET_PAST_BOOKINGS,
        },
        async (response: any) => {
          if (response && !response.error) {
            if (!deepEqual(response, savedData)) {
              await currentStore.setValue(response);
              if (onFreshData) onFreshData(response);
            }
            resolve(response);
          } else {
            reject(response?.error || "Unknown error");
          }
        }
      );
    });
  };

  if (savedData) {
    // Return cached data immediately, fetch fresh in background
    fetchFresh(); // Don't await
    return savedData;
  }

  // No cached data, fetch and return fresh
  try {
    const freshData = await fetchFresh();
    await currentStore.setValue(freshData);
    return freshData;
  } catch (err) {
    console.error("Failed to fetch bookings:", err);
    return null;
  }
};

const fetchEventTypes = async () => {
	return new Promise((resolve, reject) => {
		chrome.runtime.sendMessage(
			{ type: CHROME_MESSAGE_TYPE.GET_EVENT_TYPES },
			(response: any) => {
				if (response && !response.error) {
					resolve(response);
				} else {
					reject(response?.error || "Unknown error");
				}
			}
		);
	});
};

const markShowNoShow = async (payLoad: MarkShowNoShowPayload) => {
	return new Promise((resolve, reject) => {
		chrome.runtime.sendMessage(
			{ type: CHROME_MESSAGE_TYPE.MARK_SHOW_NOSHOW, payLoad },
			(response: any) => {
				if (response && !response.error) {
					resolve(response);
				} else {
					reject(response?.error || "Unknown error");
				}
			}
		);
	});
};

export { fetchUserInfo, fetchEventTypes, fetchBookings, markShowNoShow };
