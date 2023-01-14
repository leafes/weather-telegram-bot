const getWeatherData = async (city) => {
  const getCityGeolocation = async (city) => {
    console.log('City to find: '+ city);
    const f = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const result = await f.json();
    if (Object.keys(result).length < 2) return null;
    const response = result.results[0];
    return response;
  };
  const geolocation = await getCityGeolocation(city);
  if (geolocation === null) return null;

  const {latitude, longitude, country, name} = geolocation;
  const f = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
  const result = await f.json();
  return {...result, country, city: name};
};

export default getWeatherData;