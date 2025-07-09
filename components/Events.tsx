import { format } from "date-fns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import useExtensionData from "@/lib/hooks/useExtensionData";

export default function Events() {
	const { bookings } = useExtensionData();

	if (!bookings) return null;

	const renderBookings = (list: any[]) => (
		<div className="text-sm mt-3">
			{bookings.map((b, i) => {
				const names = (b.attendees || []).map((a: any) => a.name);
				const shown = names.slice(0, 2).join(", ");
				const remaining = names.length - 2;
				const label = "between You and";

				const start = new Date(b.startTime);
				const end = new Date(b.endTime);

				const formattedDate = format(start, "EEE, dd MMM");
				const formattedTime = `${format(start, "p")} - ${format(end, "p")}`;

				return (
					<div className="bg-neutral-900 p-2 rounded-md hover:bg-neutral-800 hover:cursor-pointer">
						<p key={i}>
							{b.title}{" "}
							<>
								{label} {shown}
								{remaining > 0 && ` +${remaining} more`}
							</>
						</p>
						<span className="text-slate-400">{`${formattedDate} at ${formattedTime}`}</span>
					</div>
				);
			})}
		</div>
	);

	return (
		<div className="w-full">
			<p className="font-bold">Bookings</p>
			<Tabs defaultValue="upcoming" className="w-full mt-2">
				<TabsList className="w-full">
					<TabsTrigger value="upcoming" className="w-full">
						Upcoming
					</TabsTrigger>
					<TabsTrigger value="past" className="w-full">
						Past
					</TabsTrigger>
				</TabsList>

				<TabsContent value="upcoming" className="text-sm">
					{renderBookings(bookings)}
				</TabsContent>

				<TabsContent value="past" className="text-sm text-muted-foreground">
					No past bookings yet.
				</TabsContent>
			</Tabs>
		</div>
	);
}
