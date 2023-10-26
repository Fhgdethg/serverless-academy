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
    inline_keyboard: [
      [{text: 'Forecast in Nice', callback_data: 'forecast'}]
    ]
  })
};

const timeoutButtons = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{text: 'at intervals of 3 hours', callback_data: '3'}, {text: 'at intervals of 6 hours', callback_data: '6'}]
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

bot.on('callback_query', ({data}) => {
  if (data === 'forecast')
    bot.sendMessage(botChatID, 'Select timeout', timeoutButtons)
  else if (data === '3') {
    threeHoursInterval = setInterval(sendWeatherToBot, threeHoursInMilliseconds)
    clearInterval(sexHoursInterval);
  }
  else if (data === '6') {
    sexHoursInterval = setInterval(sendWeatherToBot, sixHoursInMilliseconds)
    clearInterval(threeHoursInterval);
  }
});
