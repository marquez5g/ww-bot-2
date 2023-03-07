import qrcode from 'qrcode-terminal'

import { Client, LocalAuth } from 'whatsapp-web.js'
const client = new Client({
  authStrategy: new LocalAuth(),
})

client.on('qr', (qr: any) => {
  qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
  console.log('Client is ready!')
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
client.on('message', async (message: { body: string; reply: any }) => {
  try {
    const cleanInput = message.body.trim().toLowerCase().split(' ')
    const command = cleanInput[0]
    const argument = cleanInput[1]
    switch (command) {
      case '#ping':
        message.reply('pong')
        break
      case '#hora':
        {
          const date = new Date()
          const hour = date.getHours()
          const minute = date.getMinutes()
          const second = date.getSeconds()
          const options: any = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }
          const dateStr = date.toLocaleDateString('es-ES', options)
          message.reply(`Son las ${hour}:${minute}:${second} del "${dateStr}"`)
        }
        break
      case '#edad':
        {
          const name = argument
          const request = await fetch(`https://api.agify.io?name=${name}`)
          const response: any = await request.json()
          const { age } = response
          const replyMessage = `${name}, tu edad es: ${age as string} años`
          message.reply(replyMessage)
        }
        break
    }
  } catch (error) {
    message.reply('Algo falló, intenta otro comando.')
    console.log('hola')
  }
})

client
  .initialize()
  .then(() => {})
  .catch((e) => {
    console.error('Error', e)
  })
