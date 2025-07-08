import "./App.css";
import useExtensionData from "../utils/hooks/useExtensionData";
import Main from "../components/Main";

function App() {
	const { userData, isLoading } = useExtensionData();

	const renderContent = () => {
		if (isLoading) return <p>loading...</p>;

		if (!userData) return <p>Not logged in</p>;
		return <Main userData={userData} />;
	};
	return (
		<div className="min-h-52 p-3">
			{renderContent()}
		</div>
	)
}

export default App;
