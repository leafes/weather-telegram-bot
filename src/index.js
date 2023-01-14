import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import getWeatherData from "./getWeather.js";
import { formatWeatherData, normalizeCityName } from "./formatters.js";

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Send me the city name to get the weather infomation'));

bot.on(message('text'), async (ctx) => {
    const normalizedCityName = normalizeCityName(ctx.message.text);
    ctx.reply(`City is: ${normalizedCityName}\nFetching info...`);
    const weatherData = await getWeatherData(normalizedCityName);
    ctx.reply(formatWeatherData(weatherData));
    return;
  });


bot.launch(); 
console.log('BOT STARTED');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));