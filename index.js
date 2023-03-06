const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

client.on('message', async message => {
    try {
        const cleanInput = message.body.trim().toLowerCase().split(' ');
        const command = cleanInput[0];
        const argument = cleanInput[1];
        switch (command) {
            case '#ping':
                message.reply('pong');
                break;
            case '#hora':
                let date = new Date();
                let hour = date.getHours();
                let minute = date.getMinutes();
                let second = date.getSeconds();
                let options = {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
                };
                let dateStr = date.toLocaleDateString("es-ES", options);
                message.reply(`Son las ${hour + ":" + minute + ":" + second} del "${dateStr}`);
                break;
            case '#edad':
                let name = argument;
                const request = await fetch(`https://api.agify.io?name=${name}`);
                const response = await request.json();
                const replyMessage = `${name}, tu edad es: ${response.age} años`
                message.reply(replyMessage);
                break;
        }
    }   
     catch (error) {
     message.reply('Algo falló, intenta otro comando.')
    }
});
 