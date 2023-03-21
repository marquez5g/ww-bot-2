import { type Message } from 'whatsapp-web.js'
import { Module, StopPropagation } from '../module'

export class YesOrNotModule extends Module {
  constructor() {
    super('yes-or-not')
    this._command = '#decide'
  }

  async call(message: Message): Promise<void> {
    const [command] = this.splitCommand(message.body)
    if (!message.body.toLowerCase().includes(' o ') || !message.body.toLowerCase().includes(' ó ') || command !== this._command) return

    const text = message.body

    const options = text.toLowerCase().split(' o ')
    console.debug('options:', { options })
    const chosen = options[Math.floor(Math.random() * options.length)]

    await message.reply(`Prefiero el de ${chosen}`)

    throw new StopPropagation()
  }
}
