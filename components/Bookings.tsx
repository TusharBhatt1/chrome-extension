import { format } from "date-fns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import useExtensionData from "@/lib/hooks/useExtensionData";
import { SquareArrowOutUpRight } from "lucide-react";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
import { useMemo } from "react";

export default function Bookings() {
	const { bookings, showUpcomingBookings, setShowUpcomingBookings } =
		useExtensionData();

	// if (!bookings) return null;
	console.log(bookings);
	const renderBookings = useMemo(
		() => (
			<div className="text-sm mt-3 space-y-3">
				{bookings?.map(
					({ title, uid, metadata, attendees, startTime, endTime }, i) => {
						const names = (attendees || []).map((a: any) => a.name);
						const shown = names.slice(0, 2).join(", ");
						const remaining = names.length - 2;
						const label = "between You and";

						const start = new Date(startTime);
						const end = new Date(endTime);

						const formattedDate = format(start, "EEE, dd MMM");
						const formattedTime = `${format(start, "p")} - ${format(end, "p")}`;

						return (
							<div className="bg-neutral-100 p-2 rounded-md flex justify-between items-center">
								<div>
									<p key={i}>
										{title}{" "}
										<>
											{label} {shown}
											{remaining > 0 && ` +${remaining} more`}
										</>
									</p>
									<span className="text-neutral-700">{`${formattedDate} at ${formattedTime}`}</span>
								</div>
								<div className="flex gap-4 items-center">
									<Tooltip>
										<TooltipTrigger asChild>
											<a
												target="_blank"
												href={`https://app.cal.com/booking/${uid}`}
											>
												<SquareArrowOutUpRight size={18} />
											</a>
										</TooltipTrigger>
										<TooltipContent>
											<p>Go to booking</p>
										</TooltipContent>
									</Tooltip>
									<a
										target="_blank"
										className="underline"
										href={metadata.videoCallUrl}
									>
										Join
									</a>
								</div>
							</div>
						);
					}
				)}
			</div>
		),
		[showUpcomingBookings, bookings]
	);

	return (
		<div className="w-full">
			<p className="font-semibold">Bookings</p>
			<Tabs defaultValue="upcoming" className="w-full mt-2">
				<TabsList className="w-full">
					<TabsTrigger
						onClick={() => setShowUpcomingBookings(true)}
						value="upcoming"
						className="w-full"
					>
						Upcoming
					</TabsTrigger>
					<TabsTrigger
						onClick={() => setShowUpcomingBookings(false)}
						value="past"
						className="w-full"
					>
						Past
					</TabsTrigger>
				</TabsList>

				<TabsContent value="upcoming" className="text-sm">
					{renderBookings}
				</TabsContent>

				<TabsContent value="past" className="text-sm text-muted-foreground">
					{renderBookings}
				</TabsContent>
			</Tabs>
		</div>
	);
}
