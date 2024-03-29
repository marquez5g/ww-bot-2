import { type Message } from 'whatsapp-web.js'
import { Module, StopPropagation } from '../module'

const about = `Soy un bot.

☺️☺️❤️❤️🍀🥸`

export class AboutModule extends Module {
  constructor() {
    super('about')
    this._command = '#sobre'
  }

  async call(message: Message): Promise<void> {
    const [command] = this.splitCommand(message.body)
    if (command !== this._command) return

    const mode = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'

    await message.reply(`${mode}\n\n${about}`)

    throw new StopPropagation()
  }
}
