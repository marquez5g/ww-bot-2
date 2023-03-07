import { type Message } from 'whatsapp-web.js'
import { Module, StopPropagation } from '../../module'

export class RoomModule extends Module {
  constructor() {
    super()
    this._command = '#mesa'
  }

  async call(message: Message): Promise<void> {
    const [command, argument] = this.splitCommand(message.body)
    if (command !== this._command) return
    switch (argument) {
      case 'front':
        await message.reply(
          'https://digitalhouse.zoom.us/j/92914685843?pwd=K25zcXlLYWhIeEFZc3R6aXNYZDFrZz09'
        )
        break
      case 'infra':
        await message.reply(
          'https://digitalhouse.zoom.us/j/92914685843?pwd=K25zcXlLYWhIeEFZc3R6aXNYZDFrZz09'
        )
        break
    }
    throw new StopPropagation()
  }
}
