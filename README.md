# WhatsApp Web Bot

This is a Node.js project that implements a WhatsApp web bot. The bot has the following features:

- Guesses the birthday of any name, using an external API.
- Provides the current time.
- Responds with "pong" when a "#ping" message is received.

## Requirements
Node.js 14 or later

## Installation
1. Install dependencies: `npm install`.
2. Start the bot: `npm start`.

## Usage
To use the bot, run npm start to start the bot. The bot will prompt you to scan a QR code with your WhatsApp account using your phone. Once the bot is logged in, you can send any message, and the bot will respond according to the following rules:

- If the message is "#edad <name>", the bot will guess the birthday of that person and respond with the result.
- If the message is "#hora", the bot will respond with the current time.
- If the message is "#ping", the bot will respond with "pong".

## Credits
This bot uses the [Agify](https://agify.io/) API to guess ages. It also uses the [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) package to interact with WhatsApp Web.

**Obviously, this README.md was made with ChatGPT xD.**
