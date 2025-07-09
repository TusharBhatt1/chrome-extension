import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Booking } from "./types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function extractJson<T>(
	response: any[]
): T | null {
	return response?.[0]?.result?.data?.json || null;
}
