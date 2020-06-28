export const nextMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 1);

export const prevMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() - 1, 1);

export const getMonthDayCount = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

export const getFirsDayOfWeekByMonth = (date) => {
  let firsDayOfWeekByMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
  ).getDay();

  return firsDayOfWeekByMonth == 0 ? 7 : firsDayOfWeekByMonth;
};

export const getDateWithoutTime = (date) =>
  new Date(
    new Date(date).getFullYear(),
    new Date(date).getMonth(),
    new Date(date).getDate(),
  );
