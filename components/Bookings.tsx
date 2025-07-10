import { format } from "date-fns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import useExtensionData from "@/lib/hooks/useExtensionData";
import { LoaderCircle, SquareArrowOutUpRight, Eye, EyeOff } from "lucide-react";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
import { useMemo } from "react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { markShowNoShow } from "@/lib/actions";
import { toast } from "sonner";

export default function Bookings() {
	const { bookings, showUpcomingBookings, setShowUpcomingBookings } =
		useExtensionData();

	const isPastBookings =
		!!bookings && new Date(bookings[0].endTime) < new Date();

	const renderBookings = useMemo(
		() => (
			<div className="text-sm mt-3 space-y-3 max-h-72 overflow-auto">
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
						// 15 Min Meeting between Tushar Bhatt and Tushar between You and Tushar
						return (
							<div className="bg-neutral-100 p-2 rounded-md flex justify-between items-center">
								<div>
									<p key={i}>
										{title}{" "}
										<>
											{!showUpcomingBookings && `${label} ${shown}`}
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
									{showUpcomingBookings ? (
										<a
											target="_blank"
											className="underline"
											href={metadata.videoCallUrl}
										>
											Join
										</a>
									) : (
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="outline" size="sm">
													Mark
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent>
												{attendees?.map(
													({ name, email, noShow }, index: number) => (
														<DropdownMenuItem
															key={index}
															onClick={() =>
																markShowNoShow({
																	bookingUid: uid,
																	attendees: [
																		{
																			email: email,
																			noShow: !noShow,
																		},
																	],
																})
																	.then(() =>
																		toast.success(
																			`${name} marked as ${
																				noShow ? " show" : "no show"
																			}`
																		)
																	)
																	.catch(() =>
																		toast.error("Something went wrong !")
																	)
															}
														>
															<>
																<Tooltip>
																	<TooltipTrigger asChild>
																		<span className="flex items-center gap-2">
																			{name} — {noShow ? <EyeOff /> : <Eye />}
																		</span>
																	</TooltipTrigger>
																	<TooltipContent>
																		<span>
																			{noShow ? "Mark show" : "Mark no show"}
																		</span>
																	</TooltipContent>
																</Tooltip>
															</>{" "}
														</DropdownMenuItem>
													)
												)}
											</DropdownMenuContent>
										</DropdownMenu>
									)}
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
						disabled={!bookings}
						onClick={() => setShowUpcomingBookings(false)}
						value="past"
						className="w-full"
					>
						Past
					</TabsTrigger>
				</TabsList>

				<TabsContent value="upcoming" className="text-sm">
					{bookings && !isPastBookings ? (
						renderBookings
					) : (
						<div className="flex items-center justify-center min-h-12">
							<LoaderCircle className="animate-spin text-muted-foreground" />
						</div>
					)}{" "}
				</TabsContent>

				<TabsContent value="past" className="text-sm">
					{isPastBookings ? (
						renderBookings
					) : (
						<div className="flex items-center justify-center min-h-12">
							<LoaderCircle className="animate-spin text-muted-foreground" />
						</div>
					)}{" "}
				</TabsContent>
			</Tabs>
		</div>
	);
}
