const transformTime12 = (hour: string | undefined) => {
	const oldHour = Number(hour);
	let newHour = String(oldHour);

	if (oldHour === 0) {
		newHour = '12';
	} else if (oldHour === 13) {
		newHour = '01';
	} else if (oldHour === 14) {
		newHour = '02';
	} else if (oldHour === 15) {
		newHour = '03';
	} else if (oldHour === 16) {
		newHour = '04';
	} else if (oldHour === 17) {
		newHour = '05';
	} else if (oldHour === 18) {
		newHour = '06';
	} else if (oldHour === 19) {
		newHour = '07';
	} else if (oldHour === 20) {
		newHour = '08';
	} else if (oldHour === 21) {
		newHour = '09';
	} else if (oldHour === 22) {
		newHour = '10';
	} else if (oldHour === 23) {
		newHour = '11';
	}
	return newHour;
};

export default transformTime12;
