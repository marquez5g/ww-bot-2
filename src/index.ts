/* eslint-disable import/first */
import dotenv from 'dotenv'
dotenv.config()

import debugMaker from 'debug'

import { ArgumentParser } from 'argparse'
import qrcode from 'qrcode-terminal'

import { Client, LocalAuth, type Message } from 'whatsapp-web.js'

import { StopPropagation } from './module'
import { HourModule } from './modules/hour'
import { BirthModule } from './modules/birth'
import { PingModule } from './modules/ping'
import { RoomModule } from './modules/dh/room'
import { TeamsModule } from './modules/dh/teams'
import { LectureModule } from './modules/dh/lecture'
import { YesOrNotModule } from './modules/yesornot'
import { AboutModule } from './modules/about'

const log = debugMaker('bot')
const debug = debugMaker('debug')

const argparser = new ArgumentParser({
  description: 'WhatsApp Bot',
})

argparser.add_argument('--module-list', {
  dest: 'moduleList',
  action: 'store_true',
  help: 'Show all the available modules',
})

const args = argparser.parse_args()

// All the modules are here
const loadedModules = [
  new HourModule(),
  new BirthModule(),
  new PingModule(),
  new RoomModule(),
  new TeamsModule(),
  new LectureModule(),
  new YesOrNotModule(),
  new AboutModule(),
]

if (args.moduleList) {
  console.log('Module list:')
  loadedModules.forEach((module) => {
    console.log(`-> ${module.name}`)
  })
  process.exit()
}

const client = new Client({
  authStrategy: new LocalAuth(),
})

client.on('qr', (qr: any) => {
  qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
  log('ready')
  console.log('Client is ready!')
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
client.on('message', async (message: Message) => {
  // Find the module that understands this message
  for (let i = 0; i < loadedModules.length; i++) {
    const module = loadedModules[i]

    // Call the module, if the module raise StopPropagation, then we have to
    // stop the for-loop
    try {
      debug(`asking in ${module.name}`)
      await module.call(message)
    } catch (e) {
      if (e instanceof StopPropagation) {
        log(`stop in ${module.name}`)
        break
      } else {
        log(e)
        await message.reply('Algo falló, intenta otro comando.')
        throw e
      }
    }
  }
})

client
  .initialize()
  .then(() => {
    console.log('Bot started')
  })
  .catch((e) => {
    console.error('Error', e)
  })
