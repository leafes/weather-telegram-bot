import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import getWeatherData from "./getWeather.js";

const bot = new Telegraf(process.env.BOT_TOKEN);

// Move formatters to another module
const formatWeatherData = (data) => {
  if (data === null) return 'City not found 😐';

  const {temperature, time} = data["current_weather"];
  const {country, city} = data;
  return `${city} / ${country} — ${temperature} Celcius\n———\nData collected at: ${time.slice(-5)} GMT`
};

// Work on normalization of names with few words 
const normalizeCityName = (city) => {
  const cityWithoutSpecialC = city.replace(/[^a-zA-Zа-яА-Я0123456789\- ]/g, "");
  const [firstLetter] = cityWithoutSpecialC.toUpperCase();
  const otherLetters = cityWithoutSpecialC.slice(1).toLowerCase();
  const normalizedCityName = firstLetter + otherLetters;

  return normalizedCityName;
}


bot.start((ctx) => ctx.reply('Send me the city name to get the weather infomation'));

bot.on(message('text'), async (ctx) => {
    const normalizedCityName = normalizeCityName(ctx.message.text);
    ctx.reply(`City is: ${normalizedCityName}\nFetching info...`);
    const weatherData = await getWeatherData(normalizedCityName);
    ctx.reply(formatWeatherData(weatherData));
  });


bot.launch(); 
console.log('BOT STARTED');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));