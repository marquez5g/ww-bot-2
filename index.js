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
            case '#equipos':
                message.reply(`Equipo 1:

                Clara Liseth Escobar Sarmiento
                Nahuel Barbosa
                Laura Vanessa Vanegas
                Santiago Forero
                Sergio Gonzalez
                Cristihan lotorto
                
                Equipo 2:
                
                Anlly Lopez Betancun
                Luis Miguel Orviz
                Johanna Diacono
                Lucia zanotti
                Miguel Angel Molina
                Camilo Castro
                
                Equipo 3:
                
                Gabriel Marquez
                Natalia Muñoz
                Nicolas Montes Mejia
                Nelson Gomez Roa
                Juliana Pulido
                Daniela Guzman Bedoya
                
                Equipo 4:
                
                Sabina Martinez Montoya
                Wilson Alzate
                Maria Fernanda Garcia
                Miguel Angel Cuello
                Manuel Guerrero
                Juan P
                
                Equipo 5:
                
                Camila Ramirez
                Jeanpierre Alfonso
                Julian Caicedo R
                Jesus Meza Orozco
                Jorgelina Cueli
                Julie Serrano Lopez
                
                Equipo 6:
                
                Daniela Embus
                Esteban Rojas
                Andres Poblete
                Stiven Molina Gonzalez
                Kevin Martinez
                Sergio Guerrero
                
                Equipo 7:
                
                Maria Elisa Hernandez Martinez
                Jean Carlos Duque
                Esteban Jaramillo
                Wilder de Jesus Lopez
                Dayana
                Ihancker Martinez Torrez`);
                break;
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
            case '#clase':
                switch (argument){
                case "front":
                    message.reply("https://digitalhouse.zoom.us/j/91393796736?pwd=VHdVK2ptV0o2YTh0RjFPdlk2WHRNdz09");
                    break;
                case "infra":
                    message.reply("https://digitalhouse.zoom.us/j/93990279432?pwd=ZVduVVFXSlIvNnQzMWRpT2d4ejBCZz09");
                    break;
                }
                break;
            case '#mesa':
                switch (argument) {
                    case "front":
                        message.reply("https://digitalhouse.zoom.us/j/92914685843?pwd=K25zcXlLYWhIeEFZc3R6aXNYZDFrZz09");
                        break;  
                    case "infra":
                        message.reply("https://digitalhouse.zoom.us/j/92914685843?pwd=K25zcXlLYWhIeEFZc3R6aXNYZDFrZz09")
                        break;
                }
                break;
        }
    }   
     catch (error) {
     message.reply('Algo falló, intenta otro comando.')
    }
});
 