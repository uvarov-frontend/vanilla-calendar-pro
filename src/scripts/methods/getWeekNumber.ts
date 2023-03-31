const getWeekNumber = (date: string | undefined, iso8601: boolean) => {
	if (!date) return null;
	const day = new Date(`${date} 00:00:00`).getDate();
	const month = new Date(`${date} 00:00:00`).getMonth();
	const year = new Date(`${date} 00:00:00`).getFullYear();
	const currentDate = new Date(year, month, day);
	const dayNum = iso8601 ? currentDate.getDay() || 7 : currentDate.getDay();
	currentDate.setDate(currentDate.getDate() + 4 - dayNum);
	const yearStart = new Date(currentDate.getFullYear(), 0, 1);
	const weekNumber = Math.ceil((((+currentDate - +yearStart) / 86400000) + 1) / 7);

	return {
		year,
		week: weekNumber,
	};
};

export default getWeekNumber;
