function getEorzeaHour(lDate) {
  const unixSeconds = lDate.valueOf() / 1000;
  const eorzeanHours = Math.floor(unixSeconds / 175);
  const eorzeaHour = eorzeanHours % 24;
  return eorzeaHour;
}

function calculateForecastTarget(lDate) {
  const unixSeconds = lDate.valueOf() / 1000;
  const eorzeanHours = Math.floor(unixSeconds / 175);
  const eorzeanDays = Math.floor(eorzeanHours / 24) << 0;
  const eorzeaHour = eorzeanHours % 24;
  let timeChunk = eorzeaHour - (eorzeanHours % 8);
  timeChunk = (timeChunk + 8) % 24;
  const seed = eorzeanDays * 100 + timeChunk;
  const step1 = ((seed << 11) ^ seed) >>> 0;
  const step2 = ((step1 >>> 8) ^ step1) >>> 0;
  const weatherChance = step2 % 100;
  return weatherChance;
}

function getNextWeatherForecast(maxHours = 24) {
  const weatherArray = [];
  const currentDate = new Date(new Date().setMilliseconds(0));
  const maxDate = new Date().setHours(new Date().getHours() + maxHours + 6);

  while (currentDate.valueOf() < maxDate.valueOf()) {
    const currentChance = calculateForecastTarget(currentDate);

    if (weatherArray.length === 0 || weatherArray[weatherArray.length - 1].weatherChance !== currentChance) {
      const newWeather = {
        date: currentDate.toISOString(),
        eorzeaHour: getEorzeaHour(currentDate),
        weatherChance: currentChance,
      };
      weatherArray.push(newWeather);
    }

    currentDate.setSeconds(currentDate.getSeconds() + 1);
  }
  return weatherArray;
}

getNextWeatherForecast(8)
  .filter((a) => a)
  .forEach((a) => console.log(`Date: ${a.date}\teorzeaHour: ${a.eorzeaHour}\trate: ${a.weatherChance}`));

const now = getNextWeatherForecast(24)[0];
const next = getNextWeatherForecast(24)[1];
console.log("\nCurrent Weather Rate\t", `${now.date}\teorzeaHour: ${now.eorzeaHour}\trate: ${now.weatherChance}`);
console.log("Next Weather Rate\t", `${next.date}\teorzeaHour: ${next.eorzeaHour}\trate: ${next.weatherChance}`);
