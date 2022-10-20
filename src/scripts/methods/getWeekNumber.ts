const getWeekNumber = (date: string | undefined) => {
	if (!date) return null;
	const day = new Date(date).getUTCDate();
	const month = new Date(date).getUTCMonth();
	const year = new Date(date).getUTCFullYear();
	const correctDate = new Date(year, month, day);
	const yearStart = new Date(Date.UTC(correctDate.getUTCFullYear(), 0, 1));
	const weekNumber = Math.ceil(((((+correctDate) - (+yearStart)) / 86400000) + 1) / 7);

	return {
		year: correctDate.getUTCFullYear(),
		week: weekNumber,
	};
};

export default getWeekNumber;
