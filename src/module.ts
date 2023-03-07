import { type Message } from 'whatsapp-web.js'

export type SplittedCommandType = [string | null, string]

export class StopPropagation extends Error {}

export abstract class Module {
  _command: string = ''

  abstract call(message: Message): void | Promise<void>

  splitCommand(input: string): SplittedCommandType {
    if (input.length === 0) {
      return [null, '']
    }

    const cleanInput = input.trim().split(' ')
    const command = cleanInput.shift() ?? ''
    const argument = input.slice(command.length).trim()

    return [command.toLowerCase(), argument]
  }
}
