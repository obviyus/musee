export function daysAgo(startDate: Date | null | undefined): string {
	if (
		!startDate ||
		!(startDate instanceof Date) ||
		Number.isNaN(startDate.getTime())
	) {
		return "Unknown date";
	}

	const now = Date.now();
	const then = startDate.getTime();
	const diffInMs = now - then;

	if (diffInMs < 0) {
		return "In the future";
	}

	const diffInDays = Math.floor(diffInMs / 1000 / 60 / 60 / 24);

	if (diffInDays === 0) {
		return "Today";
	} else if (diffInDays === 1) {
		return "Yesterday";
	} else {
		return `${diffInDays} days ago`;
	}
}
