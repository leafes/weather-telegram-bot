export const formatWeatherData = (data) => {
  if (data === null) return 'City not found š';

  const {temperature, time} = data["current_weather"];
  const {country, city} = data;
  return `${city} / ${country} ā ${temperature} Celcius\nāāā\nData collected at: ${time.slice(-5)} GMT`
};

// Work on normalization of names with few words 
export const normalizeCityName = (city) => {
  const cityWithoutSpecialC = city.replace(/[^a-zA-ZŠ°-ŃŠ-ŠÆ0123456789\- ]/g, "");
  const [firstLetter] = cityWithoutSpecialC.toUpperCase();
  const otherLetters = cityWithoutSpecialC.slice(1).toLowerCase();
  const normalizedCityName = firstLetter + otherLetters;

  return normalizedCityName;
}
