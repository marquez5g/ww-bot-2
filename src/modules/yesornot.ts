import { type Message } from 'whatsapp-web.js'
import { Module, StopPropagation } from '../module'

export class YesOrNotModule extends Module {
  constructor() {
    super()
    this._command = ''
  }

  async call(message: Message): Promise<void> {
    if (!message.body.toLowerCase().includes(' o ')) return

    const text = message.body

    const options = text.toLowerCase().split(' o ')
    console.debug('options:', { options })
    const chosen = options[Math.floor(Math.random() * options.length)]

    await message.reply(`Prefiero el de ${chosen}`)

    throw new StopPropagation()
  }
}
