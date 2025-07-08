import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Main({ userData }: { userData: User }) {
	return (
		<div className="flex justify-between w-full">
			<p>
				👋 Welcome, {userData.name || "User"}!
			</p>
			<Tooltip>
				<TooltipTrigger>Hover</TooltipTrigger>
				<TooltipContent>
					<p>Add to library</p>
				</TooltipContent>
			</Tooltip>
		</div>
	);
}
