import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

const BOT_TOKEN = '5859830543:AAEarTywBjksPECYxhU4JsfXyGa0KaXokcM';
const bot = new Telegraf(BOT_TOKEN);

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

  const {latitude, longitude, country} = geolocation;
  const f = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
  const result = await f.json();
  return {...result, country, city};
};

const formatWeatherData = (data) => {
  if (data === null) return 'City not found 😐';

  const {temperature, time} = data["current_weather"];
  const {country, city} = data;
  return `${city} / ${country} — ${temperature} Celcius\n———\nData collected at: ${time.slice(-5)} GMT`
};

const normalizeCityName = (city) => {
  const [firstLetter] = city;
  const normalizedCityName = firstLetter.toUpperCase() + city.slice(1).toLowerCase();
  return normalizedCityName;
}
bot.start((ctx) => {
  ctx.reply('Send me the city name to get the weather infomation');
});
bot.on(message('text'), async (ctx) => {
    const city = normalizeCityName(ctx.message.text);
    ctx.reply(`City is: ${city}\nFetching info...`);
    const weatherData = await getWeatherData(city);
    ctx.reply(formatWeatherData(weatherData));
  });


bot.launch(); 
console.log('rabotaem');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));