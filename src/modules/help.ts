import { type Message } from 'whatsapp-web.js'
import { Module, StopPropagation } from '../module'

const about = `#mesa front/back
               #clase front/back
               #edad nombre
               #decide opcion1 o opcion2
               #sobre
               #hora
               #ping`

export class HelpModule extends Module {
  constructor() {
    super('help')
    this._command = '#ayuda'
  }

  async call(message: Message): Promise<void> {
    const [command] = this.splitCommand(message.body)
    if (command !== this._command) return

    const mode = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'

    await message.reply(`${about}`)

    throw new StopPropagation()
  }
}
