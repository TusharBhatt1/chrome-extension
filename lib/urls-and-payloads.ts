const URLs = {
	USER_SESSION: "https://app.cal.com/api/auth/session",
	EVENT_TYPES:
		"https://app.cal.com/api/trpc/eventTypes/getEventTypesFromGroup,getEventTypesFromGroup?batch=1",
	BOOKINGS:"https://app.cal.com/api/trpc/bookings/get?batch=1"
};

const PAYLOADS = {
	EVENT_TYPES: {
		0: {
			json: {
				limit: 10,
				group: { teamId: null, parentId: null },
			},
		},
		1: {
			json: {
				limit: 10,
				searchQuery: "",
				group: { teamId: null, parentId: null },
			},
			meta: {
				values: {
					"group.parentId": ["undefined"],
				},
			},
		},
	},
	BOOKINGS: {
		0: {
		  json: {
			limit: 10,
			offset: 0,
			filters: {
			  status: "upcoming",
			  eventTypeIds: null,
			  teamIds: null,
			  userIds: null,
			  attendeeName: null,
			  attendeeEmail: null,
			  bookingUid: null,
			  afterStartDate: null,
			  beforeEndDate: null,
			},
		  },
		  meta: {
			values: {
			  "filters.eventTypeIds": ["undefined"],
			  "filters.teamIds": ["undefined"],
			  "filters.userIds": ["undefined"],
			  "filters.attendeeName": ["undefined"],
			  "filters.attendeeEmail": ["undefined"],
			  "filters.bookingUid": ["undefined"],
			  "filters.afterStartDate": ["undefined"],
			  "filters.beforeEndDate": ["undefined"],
			},
		  },
		},
	  }
};
export { URLs, PAYLOADS };
