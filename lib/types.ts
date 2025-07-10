interface User {
	name: string;
	username: string;
}
interface Booking {
	title: string;
	uid: string;
	startTime: string;
	endTime: string;
	metadata: {
		videoCallUrl: string;
	};
	user: {
		name: string;
	};
	attendees: {
		id: number;
		name: string;
		email: string;
		timeZone: string;
		noShow?: boolean;
	}[];
}

interface MarkShowNoShowPayload {
	bookingUid: string;
	attendees: {
		email: string;
		noShow: boolean;
	}[];
}

export { User, Booking, MarkShowNoShowPayload };
