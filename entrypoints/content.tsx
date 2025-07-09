import ReactDOM from "react-dom/client";
import App from "@/entrypoints/popup/App";

export default defineContentScript({
	matches: ['https://www.hey.com/*'],
	main(ctx) {
		// const ui = createIntegratedUi(ctx, {
		// 	position: "inline",
		// 	anchor: "body",
		// 	onMount: (container) => {
		// 		const root = ReactDOM.createRoot(container);
		// 		root.render(<App />);
		// 		return root;
		// 	},
		// 	onRemove: (root) => {
		// 		root?.unmount();
		// 	},
		// });
		// ui.mount();
	},
});
