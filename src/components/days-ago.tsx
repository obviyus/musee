export function daysAgo(startDate: Date) {
	const daysAgo = startDate
		? Math.floor(
				(Date.now() - new Date(startDate).getTime()) / 1000 / 60 / 60 / 24,
		  )
		: null;

	return daysAgo ? `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago` : "Someday";
}
