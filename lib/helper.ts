import { toast } from "sonner";

const handleCopy = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text);
		toast.success("Copied")
	} catch (err) {
		console.error("Failed to copy:", err);
	}
};

export { handleCopy };
