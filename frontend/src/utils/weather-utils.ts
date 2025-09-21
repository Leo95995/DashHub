export const kelvinToCelsius = (kelvin: number) => Math.round(kelvin - 273.15);

export const kelvinToFahrenheit = (kelvin: number) =>
  Math.round(((kelvin - 273.15) * 9) / 5 + 32);

export const timestampToTime = (timestamp: number, timezoneOffset: number) => {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
export const regularTimeStampToTime = (timestamp: number, timezoneOffset: number) => {
  const date = new Date((timestamp + timezoneOffset));
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const getHoursAndMin = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes}`;
};

export const get_temperatures = (
  temp: number,
  temp_min: number,
  temp_max: number,
  temperatureType: string
) => {
  let standard;
  let min;
  let max;
  if (temperatureType === "celsius") {
    standard = `${kelvinToCelsius(temp)} C°`;
    min = `${kelvinToCelsius(temp_min)}  C°`;
    max = `${kelvinToCelsius(temp_max)}  C°`;
  } else {
    standard = `${temp.toFixed(0)} K`;
    min = `${temp_min.toFixed(0)} K`;
    max = `${temp_max.toFixed(0)} K`;
  }
  return { standard, min, max };
};

export const background_color = (weatherType: string) => {
  const weather = weatherType.toLowerCase();

  switch (weather) {
    case "clear":
      return "from-blue-400 to-blue-200 text-black dark:from-indigo-900 dark:to-slate-800 dark:text-white"; // cielo sereno

    case "clouds":
      return "from-gray-400 to-gray-200 text-black dark:from-gray-700 dark:to-gray-900 dark:text-white"; // nuvoloso

    case "rain":
      return "from-slate-600 to-slate-800 text-white dark:from-slate-700 dark:to-slate-900"; // pioggia

    case "drizzle":
      return "from-slate-400 to-slate-600 text-black dark:from-slate-600 dark:to-slate-800 dark:text-white"; // pioggerella

    case "thunderstorm":
      return "from-gray-800 via-purple-700 to-black text-white dark:from-gray-900 via-purple-800 to-black"; // temporale

    case "snow":
      return "from-blue-100 to-white text-black dark:from-gray-600 dark:to-gray-800 dark:text-white"; // neve

    case "mist":
    case "fog":
    case "haze":
      return "from-gray-200 to-gray-400 text-black dark:from-gray-600 dark:to-gray-800 dark:text-white"; // nebbia/foschia

    case "dust":
    case "sand":
      return "from-amber-200 to-amber-400 text-black dark:from-amber-600 dark:to-amber-800 dark:text-white"; // sabbia/polvere

    case "smoke":
      return "from-gray-500 to-gray-700 text-black dark:from-gray-700 dark:to-gray-900 dark:text-white"; // fumo

    default:
      return "from-slate-300 to-slate-500 text-black dark:from-gray-700 dark:to-gray-900 dark:text-white"; // fallback neutro
  }
};
