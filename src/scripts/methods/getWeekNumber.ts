const getWeekNumber = (date: string | undefined, iso8601: boolean) => {
	if (!date) return null;
	const day = new Date(date).getUTCDate();
	const month = new Date(date).getUTCMonth();
	const year = new Date(date).getUTCFullYear();
	const currentDate = new Date(Date.UTC(year, month, day));
	const dayNum = iso8601 ? currentDate.getUTCDay() || 7 : currentDate.getUTCDay();
	currentDate.setUTCDate(currentDate.getUTCDate() + 4 - dayNum);
	const yearStart = new Date(Date.UTC(currentDate.getUTCFullYear(), 0, 1));
	const weekNumber = Math.ceil((((+currentDate - +yearStart) / 86400000) + 1) / 7);

	return {
		year,
		week: weekNumber,
	};
};

export default getWeekNumber;
