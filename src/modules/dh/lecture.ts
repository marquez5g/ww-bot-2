import { type Message } from 'whatsapp-web.js'
import { Module, StopPropagation } from '../../module'

export class LectureModule extends Module {
  constructor() {
    super('lecture')
    this._command = '#clase'
  }

  async call(message: Message): Promise<void> {
    const [command, argument] = this.splitCommand(message.body)
    if (command !== this._command) return
    switch (argument) {
      case 'front':
        await message.reply(
          'https://digitalhouse.zoom.us/j/91393796736?pwd=VHdVK2ptV0o2YTh0RjFPdlk2WHRNdz09'
        )
        break
      case 'infra':
        await message.reply(
          'https://digitalhouse.zoom.us/j/93990279432?pwd=ZVduVVFXSlIvNnQzMWRpT2d4ejBCZz09'
        )
        break
    }
    throw new StopPropagation()
  }
}
