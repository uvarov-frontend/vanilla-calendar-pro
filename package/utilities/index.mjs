/*! name: vanilla-calendar-pro | url: https://github.com/uvarov-frontend/vanilla-calendar-pro */
const getDateString$1 = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const getDate$1 = (date) => /* @__PURE__ */ new Date(`${date}T00:00:00`);
const parseDates$1 = (dates) => dates.reduce((accumulator, date) => {
  if (date.match(/^(\d{4}-\d{2}-\d{2})$/g)) {
    accumulator.push(date);
  } else {
    date.replace(/(\d{4}-\d{2}-\d{2}).*?(\d{4}-\d{2}-\d{2})/g, (_, startDateStr, endDateStr) => {
      const startDate = getDate$1(startDateStr);
      const endDate = getDate$1(endDateStr);
      const currentDate = new Date(startDate.getTime());
      for (currentDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        accumulator.push(getDateString$1(currentDate));
      }
      return _;
    });
  }
  return accumulator;
}, []);
const parseDates = (dates) => parseDates$1(dates);
const getDateString = (date) => getDateString$1(date);
const getDate = (date) => getDate$1(date);
export {
  getDate,
  getDateString,
  parseDates
};
