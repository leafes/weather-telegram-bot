import { Telegraf } from "telegraf";

const BOT_TOKEN = '5859830543:AAEarTywBjksPECYxhU4JsfXyGa0KaXokcM';
const bot = new Telegraf(BOT_TOKEN);

const getWeatherData = async () => {
  const f = await fetch('https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&current_weather=true')
  const result = await f.json();
  console.log(result);
  return result;
};

const formatWeatherData = (data) => {
  const {temperature, time} = data["current_weather"];
  return `Temperature: ${temperature} Celcius,\nTime in London: ${time.slice(-5)}`
};

bot.start((ctx) => {
  ctx.reply('Hi! Ninusya, can you write /rap?');
});
bot.command('weather', async (ctx) => {
  const weatherData = await getWeatherData();
  const formattedWeatherData = formatWeatherData(weatherData);
  ctx.reply(formattedWeatherData);
  console.log(formattedWeatherData);
});
bot.command('rap', (ctx) => {
  ctx.reply('rap? ☺️');
  console.log('Replayed to rap');
});
bot.launch();
console.log('rabotaem');
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));