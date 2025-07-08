import "./App.css";
import useExtensionData from "../utils/hooks/useExtensionData";

function App() {
	const { userData, isLoading } = useExtensionData();

	return (
		<div>
			{isLoading ? (
				<p className="text-gray-500">Loading user info...</p>
			) : userData?.name ? (
				<div>
					<p className="text-green-800 font-medium">
						👋 Welcome, {userData.name || "User"}!
					</p>
				</div>
			) : (
				<p className="text-red-600">Not logged in.</p>
			)}
		</div>
	);
}

export default App;
