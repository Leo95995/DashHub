/**
 * Updated the function with the possibility to pass an offeset date
 * (negative eg: -1 or positive eg: +1)
 * @param offestDays
 * @returns
 */
export const getTodayFormattedDate = (offsetDays = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${yyyy}-${mm}-${dd}`;
  return formattedDate;
};

export const nasaUtils = {
  getTodayFormattedDate,
};
