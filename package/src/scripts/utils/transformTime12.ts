const transformTime12 = (hour: string): string => {
  const hourMap: { [key: number]: string } = {
    0: '12',
    13: '01',
    14: '02',
    15: '03',
    16: '04',
    17: '05',
    18: '06',
    19: '07',
    20: '08',
    21: '09',
    22: '10',
    23: '11',
  };

  return hourMap[Number(hour)] || String(hour);
};

export default transformTime12;
