import { type Message } from 'whatsapp-web.js'
import { Module, StopPropagation } from '../module'

export class BirthModule extends Module {
  constructor() {
    super()
    this._command = '#edad'
  }

  async call(message: Message): Promise<void> {
    const [command, rest] = this.splitCommand(message.body)
    if (command !== this._command) return

    const name = rest
    const request = await fetch(`https://api.agify.io?name=${name}`)
    const response: any = await request.json()
    const { age } = response
    const replyMessage = `${name}, tu edad es: ${age as string} años`
    await message.reply(replyMessage)
    throw new StopPropagation()
  }
}
