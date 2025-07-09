import useExtensionData from "@/lib/hooks/useExtensionData";

export default function Events() {
	const { bookings } = useExtensionData();

	if (!bookings) return null;

	return (
		<div>
			<p className="font-bold">Bookings</p>
            <div className="text-sm">
			{bookings.map((b, i) => {
				const names = (b.attendees || []).map((a: any) => a.name);
				const shown = names.slice(0, 2).join(", ");
				const remaining = names.length - 2;
				const label = "between You and";

				return (
					<p key={i}>
						{b.title} {names.length > 0 && (
							<>
								{label} {shown}
								{remaining > 0 && ` +${remaining} more`}
							</>
						)}
					</p>
				);
			})}
            </div>
		</div>
	);
}
