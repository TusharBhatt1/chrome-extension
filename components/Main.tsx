import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { handleCopy } from "@/lib/helper";
import { Link } from "lucide-react";

export default function Main({ userData }: { userData: User }) {
	return (
		<div className="flex justify-between items-center">
			<p>👋 Welcome, {userData.name || "User"}!</p>
			<Tooltip>
				<TooltipTrigger
					onClick={() => handleCopy(`https://cal.com/${userData.username}`)}
					className="border-slate-100  cursor-pointer border p-1 rounded-md"
				>
					<Link size={14} />
				</TooltipTrigger>
				<TooltipContent>
					<p>Copy link</p>
				</TooltipContent>
			</Tooltip>
		</div>
	);
}
