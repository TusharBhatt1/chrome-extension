import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "lucide-react";

export default function Main({ userData }: { userData: User }) {
	return (
		<div className="flex justify-between w-full">
			<p>
				👋 Welcome, {userData.name || "User"}!
			</p>
			<Tooltip>
				<TooltipTrigger><Link/></TooltipTrigger>
				<TooltipContent>
					<p>Add to library</p>
				</TooltipContent>
			</Tooltip>
		</div>
	);
}
