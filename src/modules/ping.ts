import { type Message } from 'whatsapp-web.js'
import { Module, StopPropagation } from '../module'

export class PingModule extends Module {
  constructor() {
    super('ping')
    this._command = '#ping'
  }

  async call(message: Message): Promise<void> {
    const [command] = this.splitCommand(message.body)
    if (command !== this._command) return

    await message.reply('pong')

    throw new StopPropagation()
  }
}
