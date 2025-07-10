import "./App.css";
import useExtensionData from "@/lib/hooks/useExtensionData";
import LoggedInView from "@/components/LoggedInView";
import { Button } from "@/components/ui/button";

function App() {
	const { userData, isLoading } = useExtensionData();

	const renderContent = () => {
		if (isLoading) return <p>Loading...</p>;

		if (!userData) return (
			<div className="flex flex-col items-center justify-center gap-4 p-4 text-center h-full">
				<h2 className="text-lg font-semibold">Welcome to the Extension</h2>
				<p className="text-sm text-muted-foreground">
					Please log in to continue.
				</p>
				<a href="https://app.cal.com/auth/login" className="w-full" target="_blank"><Button className="w-full max-w-xs">Log in</Button></a>
			</div>
		);
		return <LoggedInView userData={userData} />;
	};
	return (
		<div className="min-h-52 p-3">
			{renderContent()}
		</div>
	)
}

export default App;
