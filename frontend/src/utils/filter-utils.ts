/**
 * @param widgetList
 */

type WidgetObjects = {
  crypto: boolean;
  github: boolean;
  nasa: boolean;
  weather: boolean;
};

export const filterUtils = (widgetList: WidgetObjects | {}) => {
  if (typeof widgetList !== "object" || widgetList === null) {
    return [];
  }

  const keys: (keyof WidgetObjects)[] = ["crypto", "github", "nasa", "weather"];

  //  every checka che la condizione sia rispettata in tutte le casistiche
  const isValid = keys.every(
    (k) =>
      k in widgetList &&
      typeof (widgetList as Record<string, unknown>)[k] === "boolean"
  );
  if (!isValid) return [];

  const optionList = [];

  for (const key in widgetList) {
    optionList.push({ value: key, label: `${key} widget`.toUpperCase() });
  }

  return optionList;
};
