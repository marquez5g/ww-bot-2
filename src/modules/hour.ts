import { type Message } from 'whatsapp-web.js'
import { Module, StopPropagation } from '../module'

export class HourModule extends Module {
  constructor() {
    super('hour')
    this._command = '#hora'
  }

  async call(message: Message): Promise<void> {
    const [command] = this.splitCommand(message.body)
    if (command !== this._command) return

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

    await message.reply(`Son las ${hour}:${minute}:${second} del "${dateStr}"`)

    throw new StopPropagation()
  }
}
