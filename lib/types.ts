interface User {
	name: string;
	username: string;
}
interface Booking {
	title: string;
	uuid: string;
	startTime: string;
	endTime:string;
	videoCallUrl: string;
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
