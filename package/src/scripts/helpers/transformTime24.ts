const transformTime24 = (hour: string | undefined, keeping: string | undefined) => {
	const hourMap: { [key: number]: { [key: string]: string } } = {
		0: { AM: '00', PM: '12' },
		1: { AM: '01', PM: '13' },
		2: { AM: '02', PM: '14' },
		3: { AM: '03', PM: '15' },
		4: { AM: '04', PM: '16' },
		5: { AM: '05', PM: '17' },
		6: { AM: '06', PM: '18' },
		7: { AM: '07', PM: '19' },
		8: { AM: '08', PM: '20' },
		9: { AM: '09', PM: '21' },
		10: { AM: '10', PM: '22' },
		11: { AM: '11', PM: '23' },
		12: { AM: '12', PM: '12' },
	};

	return hour && keeping ? hourMap[Number(hour)][keeping] : '';
};

export default transformTime24;
