import "./App.css";
import useExtensionData from "@/lib/hooks/useExtensionData";
import LoggedInView from "@/components/LoggedInView";

function App() {
	const { userData, isLoading } = useExtensionData();

	const renderContent = () => {
		if (isLoading) return <p>Loading...</p>;

		if (!userData) return <p>Not logged in</p>;
		return <LoggedInView userData={userData} />;
	};
	return (
		<div className="min-h-52 p-3">
			{renderContent()}
		</div>
	)
}

export default App;
