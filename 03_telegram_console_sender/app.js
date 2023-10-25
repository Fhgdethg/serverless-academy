import TelegramBot from 'node-telegram-bot-api';
import { Command } from 'commander';
import fs from 'fs';

import { token, chatID } from "./config.js";

process.env.NTBA_FIX_319 = 1;
process.env.NTBA_FIX_350 = 0;

const botToken = process.env.TOKEN || token;
const botChatID = process.env.CHAT_ID || chatID;

const program = new Command();
const bot = new TelegramBot(botToken, { polling: true });


program
  .name('app');

program
  .command('send-message <message>')
  .description('Send message to Telegram Bot')
  .action(msg => {
    bot.sendMessage(botChatID, msg)
      .then(() => {
        process.exit();
      })
      .catch((err) => {
        console.log(err);
        process.exit();
      })
  });

program
  .command('send-photo <message>')
  .description(
    'Send photo to Telegram Bot. Just drag and drop it console after \'send-photo\' option'
  )
  .action( path => {
    const photo = fs.createReadStream(path);

    bot.sendPhoto(botChatID, photo)
      .then(() => {
        process.exit();
      })
      .catch((err) => {
        console.log(err);
        process.exit();
      })
  });

program.parse(process.argv);