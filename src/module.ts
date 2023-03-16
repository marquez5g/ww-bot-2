import { type Message } from 'whatsapp-web.js'

// Define the SplittedCommandType type as an array of a string or null and
// a string
export type SplittedCommandType = [string | null, string]

// Define the StopPropagation class, which extends the built-in Error class
export class StopPropagation extends Error {}

// Define the abstract Module class
export abstract class Module {
  // Define the _command property as a string and set it to an empty string
  _command: string = ''

  // The module name. This will display when user asks for the module list
  name: string

  constructor(moduleName: string) {
    this.name = moduleName
  }

  // Define the abstract call() method that takes a Message object as a
  // parameter and returns void or Promise<void>
  abstract call(message: Message): void | Promise<void>

  // Define the splitCommand() method that takes a string as input and returns a
  // SplittedCommandType
  splitCommand(input: string): SplittedCommandType {
    // If the input string is empty, return an array with null and an
    // empty string
    if (input.length === 0) {
      return [null, '']
    }

    // Split the input string by spaces, remove any leading or trailing
    // whitespace, and assign the resulting array to cleanInput
    const cleanInput = input.trim().split(' ')
    // Remove the first item from cleanInput and assign it to command, or an
    // empty string if there are no items in cleanInput
    const command = cleanInput.shift() ?? ''
    // Create a substring of input starting at the end of command and remove
    // any leading or trailing whitespace, assigning the result to argument
    const argument = input.slice(command.length).trim()

    // Return an array containing command in lowercase and argument
    return [command.toLowerCase(), argument]
  }
}
