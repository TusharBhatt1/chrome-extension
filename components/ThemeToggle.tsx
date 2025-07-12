import { Sun, Moon } from "lucide-react";
const ThemeToggle = () => {
	const [theme, setTheme] = useState(
		localStorage.getItem("cal-extension-theme") ?? "dark"
	);

	useEffect(() => {
        localStorage.setItem("cal-extension-theme",theme)
		document.documentElement.classList.remove("dark", "light");
		document.documentElement.classList.add(theme);
	}, [theme]);

	return (
		<button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
			{theme === "dark" ? <Sun /> : <Moon />}
		</button>
	);
};
export default ThemeToggle;
