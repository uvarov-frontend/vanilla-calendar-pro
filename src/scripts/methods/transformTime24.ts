const transformTime24 = (hour: string | undefined, keeping: string | null) => {
	const oldHour = Number(hour);
	let newHour = String(oldHour);

	if (keeping === 'AM') {
		if (oldHour === 12) {
			newHour = '00';
		}
	} else if (keeping === 'PM') {
		if (oldHour === 1) {
			newHour = '13';
		} else if (oldHour === 2) {
			newHour = '14';
		} else if (oldHour === 3) {
			newHour = '15';
		} else if (oldHour === 4) {
			newHour = '16';
		} else if (oldHour === 5) {
			newHour = '17';
		} else if (oldHour === 6) {
			newHour = '18';
		} else if (oldHour === 7) {
			newHour = '19';
		} else if (oldHour === 8) {
			newHour = '20';
		} else if (oldHour === 9) {
			newHour = '21';
		} else if (oldHour === 10) {
			newHour = '22';
		} else if (oldHour === 11) {
			newHour = '23';
		}
	}
	return newHour;
};

export default transformTime24;
