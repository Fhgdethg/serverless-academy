import TelegramBot from 'node-telegram-bot-api';

import { getOptimizedWeatherData } from "./services/weatherService.js";
import { getCourses } from './services/currenciesService.js'

import { token, chatID } from "./config.js";
import {
  sixHoursInMilliseconds,
  threeHoursInMilliseconds
} from "./constants/time.js";

const botToken = process.env.TOKEN || token;
const botChatID = process.env.CHAT_ID || chatID;

const bot = new TelegramBot(botToken, { polling: true });

const menuButtons = {
  reply_markup: JSON.stringify({
    keyboard: [
      [{text: '/Погода'}],
      [{text: '/Курс валюти'}],
    ]
  })
};

const weatherTimeoutMenu = {
  reply_markup: JSON.stringify({
    keyboard: [
      [{text: 'Кожні 3 години'}, {text: 'Кожні 6 годин'}],
      [{text: 'Попереднє меню'}],
    ]
  })
};

const currenciesMenu = {
  reply_markup: JSON.stringify({
    keyboard: [
      [{text: 'USD'}, {text: 'EUR'}],
      [{text: 'Попереднє меню'}],
    ]
  })
};

bot.sendMessage(botChatID, 'Оберіть опцію меню', menuButtons);

let threeHoursInterval;
let sexHoursInterval;

const sendWeatherToBot = async () => {
  const weatherOutput = await getOptimizedWeatherData()
  await bot.sendMessage(botChatID, weatherOutput)
};

bot.on('message', async ({ text }) => {
  if (text === '/Погода'){
    await bot.sendMessage(botChatID, 'Оберіть таймаут', weatherTimeoutMenu)
  }
  else if (text.includes(' 3 ')) {
    threeHoursInterval = setInterval(sendWeatherToBot, threeHoursInMilliseconds)
    clearInterval(sexHoursInterval);
  }
  else if (text.includes(' 6 ')) {
    sexHoursInterval = setInterval(sendWeatherToBot, sixHoursInMilliseconds)
    clearInterval(threeHoursInterval);
  }

  else if (text.includes('/Курс валюти')) {
    await bot.sendMessage(botChatID, 'Оберіть валюту', currenciesMenu)
  }
  else if (text.includes('USD')) {
    const USDCourse = await getCourses('USD');
    await bot.sendMessage(botChatID, USDCourse)
  }
  else if (text.includes('EUR')) {
    const EURCourse = await getCourses('EUR');
    await bot.sendMessage(botChatID, EURCourse)
  }

  else if (text === 'Попереднє меню') {
    clearInterval(sexHoursInterval);
    clearInterval(threeHoursInterval);
    await bot.sendMessage(botChatID, 'Оберіть опцію меню', menuButtons);
  }
});
