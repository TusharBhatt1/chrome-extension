export default function Main({ userData }: { userData: User }) {
	return (
		<div>
			<p className="text-green-800 font-medium">
				👋 Welcome, {userData.name || "User"}!
			</p>
		</div>
	);
}
