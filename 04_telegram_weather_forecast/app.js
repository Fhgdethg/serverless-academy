import TelegramBot from 'node-telegram-bot-api';

import { getOptimizedWeatherData } from "./services/weatherService.js";

import { token, chatID } from "./config.js";
import {
  sixHoursInMilliseconds,
  threeHoursInMilliseconds
} from "./constants/time.js";

const botToken = process.env.TOKEN || token;
const botChatID = process.env.CHAT_ID || chatID;

const bot = new TelegramBot(botToken, { polling: true });

const niceBtn = {
  reply_markup: JSON.stringify({
    keyboard: [
      [{text: 'Forecast in Nice'}]
    ]
  })
};

const timeoutButtons = {
  reply_markup: JSON.stringify({
    keyboard: [
      [{text: 'at intervals of 3 hours'}, {text: 'at intervals of 6 hours'}]
    ]
  })
};

bot.sendMessage(botChatID, 'Find about the weather in Nice', niceBtn);

let threeHoursInterval;
let sexHoursInterval;

const sendWeatherToBot = async () => {
  const weatherOutput = await getOptimizedWeatherData()
  await bot.sendMessage(botChatID, weatherOutput)
};

bot.on('message', ({ text }) => {
  if (text.includes('Nice')){
    bot.sendMessage(botChatID, 'Select timeout', timeoutButtons)
  }
  else if (text.includes(' 3 ')) {
    threeHoursInterval = setInterval(sendWeatherToBot, threeHoursInMilliseconds)
    clearInterval(sexHoursInterval);
  }
  else if (text.includes(' 6 ')) {
    sexHoursInterval = setInterval(sendWeatherToBot, sixHoursInMilliseconds)
    clearInterval(threeHoursInterval);
  }
});
