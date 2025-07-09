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
	}[];
}

export { User, Booking };
