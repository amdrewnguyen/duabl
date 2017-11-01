export const months = {
  0: {name: "January", days: 31},
  1: {name: "February", days: 28},
  2: {name: "March", days: 31},
  3: {name: "April", days: 30},
  4: {name: "May", days: 31},
  5: {name: "June", days: 30},
  6: {name: "July", days: 31},
  7: {name: "August", days: 31},
  8: {name: "September", days: 30},
  9: {name: "October", days: 31},
  10: {name: "November", days: 30},
  11: {name: "December", days: 31},
};

export const days = [
                      "Sunday",
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday"
                    ];

export const dayHeadings = [
                      "S",
                      "M",
                      "T",
                      "W",
                      "T",
                      "F",
                      "S"
                    ];

export const firstDayOfMonth = (month, year) => {
  let d = new Date();
  d.setFullYear(year, month, 1);
  return d.getDay();
};

export const daysInMonth = (month, year) => {
  if(month !== 1) {
    return months[month].days;
  } else {
    if ((year % 100) === 0 && (year % 400) !== 0) {
      return 28;
    } else if (year % 4 === 0) {
      return 29;
    } else {
      return 28;
    }
  }
};

export const getThirtyFive = (month, year) => {
  const dayArray = [];
  let firstDay = firstDayOfMonth(month, year);
  let daysThisMonth = daysInMonth(month, year);
  let lastMonth = month === 0 ? 11 : month - 1;
  let lastMonthYear = month === 0 ? year - 1 : year;
  let nextMonth = month === 11 ? 0 : month + 1;
  let nextMonthYear = month === 11 ? year + 1 : year;
  let daysLastMonth = daysInMonth(
    month === 0 ? 11 : month - 1,
    month === 0 ? year - 1 : year
  );
  console.log(firstDay);
  console.log(daysThisMonth);
  console.log(daysLastMonth);
  for(let i = 1; i <= daysThisMonth; i++) {
    dayArray.push({year, month, day: i});
  }
  for(let i = firstDay; i > 0; i--) {
    dayArray.unshift({year: lastMonthYear,
        month: lastMonth, day: daysLastMonth--});
  }
  let i = 1;
  while (dayArray.length < 35) {
    dayArray.push({year: nextMonthYear,
        month: nextMonth, day: i++});
  }
  return dayArray;
};
