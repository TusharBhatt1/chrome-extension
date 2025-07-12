import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { handleCopy } from "@/lib/helper";
import { Link } from "lucide-react";
import { User } from "@/lib/types";
import Bookings from "./Bookings";
import CalLogo from "@/assets/cal-logo.png";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
export default function LoggedInView({ userData }: { userData: User }) {
	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-4">
					<img src={CalLogo} className="size-8" />
					<span> Welcome, {userData.name || "User"} !</span>
				</div>
				<div className="flex gap-4">
				<Tooltip>
					<TooltipTrigger
						onClick={() => handleCopy(`https://cal.com/${userData.username}`)}
						className="border-border cursor-pointer border p-1 rounded-md"
					>
						<Link size={15} />
					</TooltipTrigger>
					<TooltipContent>
						<p>Copy link</p>
					</TooltipContent>
				</Tooltip>
				<ThemeToggle/>
				</div>
			</div>
			<Bookings />
			<a href="https://app.cal.com" target="_blank">
				<Button className="w-full rounded-full">Go to App</Button>
			</a>
		</div>
	);
}
