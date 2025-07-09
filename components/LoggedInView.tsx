import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { handleCopy } from "@/lib/helper";
import { Link } from "lucide-react";
import { User } from "@/lib/types";
import Bookings from "./Bookings";

export default function LoggedInView({ userData }: { userData: User }) {
	return (
		<div className="space-y-4">
		<div className="flex justify-between items-center">
			<p>👋 Welcome, {userData.name || "User"}!</p>
			<Tooltip>
				<TooltipTrigger
					onClick={() => handleCopy(`https://cal.com/${userData.username}`)}
					className="border-slate-400  cursor-pointer border p-1 rounded-md"
				>
					<Link size={14} />
				</TooltipTrigger>
				<TooltipContent>
					<p>Copy link</p>
				</TooltipContent>
			</Tooltip>
		</div>
		<Bookings/>
		</div>
	);
}
