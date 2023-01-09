import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

const BOT_TOKEN = '5859830543:AAEarTywBjksPECYxhU4JsfXyGa0KaXokcM';
const bot = new Telegraf(BOT_TOKEN);

const getWeatherData = async (cityName) => {
  const getCityGeolocation = async (cityName) => {
    console.log('City to find: '+ cityName);
    const f = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`);
    const result = await f.json();
    const response = result.results[0] || null;
    return response;
  };
  const {latitude, longitude, country} = await getCityGeolocation(cityName);
  const f = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
  const result = await f.json();
  return {...result, country, city: cityName};
};

const formatWeatherData = (data) => {
  const {temperature, time} = data["current_weather"];
  const {country, city} = data;
  return `${city} / ${country} — ${temperature} Celcius\n———\nData collected at: ${time.slice(-5)} GMT`
};

bot.start((ctx) => {
  ctx.reply('Send me the city name to get the weather infomation');
});
bot.on(message('text'), async (ctx) => {
    const city = ctx.message.text;
    ctx.reply(`City is: ${city}\nFetching info...`);
    const weatherData = await getWeatherData(city);
    ctx.reply(formatWeatherData(weatherData));
  });


bot.launch();
console.log('rabotaem');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));