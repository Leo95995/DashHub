/**
 * @param widgetList 
 */
export const filterUtils = (widgetList: any) => {
  const optionList = [];

  for (const key in widgetList) {
    optionList.push({ value: key, label: (`${key} widget`).toUpperCase() });
  }
  return optionList;
};
