export function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function getDateOfWeek(date: Date): number {
  const dayOfWeek = date.getDay();

  // For us, sunday isn't the first day in the week, it's the last one
  if (dayOfWeek == 0) return 6;

  return dayOfWeek - 1;
}

/**
 * @param year and
 * @param month shows to the method for what year method should return the data
 *
 * In result returns array of arrays where each object has Date format or undefined (undefined for empty cells in table)
 */
export function monthData(year: number, month: number) {
  const result: (Date | undefined)[][] = [[undefined]];
  const date = new Date(year, month);

  const daysInMonth = getDaysInMonth(date);

  const monthStartsOn = getDateOfWeek(date);
  let day = 1;

  for (let i = 0; i < (daysInMonth + monthStartsOn) / 7; i++) {
    result[i] = [undefined];

    for (let y = 0; y < 7; y++) {
      if ((i === 0 && y < monthStartsOn) || day > daysInMonth) {
        result[i][y] = undefined;
      } else {
        result[i][y] = new Date(year, month, day++);
      }
    }
  }

  return { result };
}

export function monthNames(lang = 'en-US') {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => {
    return new Date(1970, month, 1).toLocaleString(lang, { month: 'long' });
  });
}

export function getWeekDayNames(lang = 'en-US') {
  return [0, 1, 2, 3, 4, 5, 6].map((day) => {
    const string =  new Date(Date.UTC(2017, 0, 2 + day)).toLocaleString(lang, {
      weekday: 'long',
    });
    const res = string.charAt(0).toUpperCase() + string.slice(1);
    return res;
  });
}
