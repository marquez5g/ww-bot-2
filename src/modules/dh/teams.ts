import { type Message } from 'whatsapp-web.js'
import { Module, StopPropagation } from '../../module'

export class TeamsModule extends Module {
  constructor() {
    super()
    this._command = '#equipos'
  }

  async call(message: Message): Promise<void> {
    const [command] = this.splitCommand(message.body)
    if (command !== this._command) return

    await message.reply(
      `Equipo 1:
                Clara Liseth Escobar Sarmiento
                Nahuel Barbosa
                Laura Vanessa Vanegas
                Santiago Forero
                Sergio Gonzalez
                Cristihan lotorto
                
                Equipo 2:
                
                Anlly Lopez Betancun
                Luis Miguel Orviz
                Johanna Diacono
                Lucia zanotti
                Miguel Angel Molina
                Camilo Castro
                
                Equipo 3:
                
                Gabriel Marquez
                Natalia Muñoz
                Nicolas Montes Mejia
                Nelson Gomez Roa
                Juliana Pulido
                Daniela Guzman Bedoya
                
                Equipo 4:
                
                Sabina Martinez Montoya
                Wilson Alzate
                Maria Fernanda Garcia
                Miguel Angel Cuello
                Manuel Guerrero
                Juan P
                
                Equipo 5:
                
                Camila Ramirez
                Jeanpierre Alfonso
                Julian Caicedo R
                Jesus Meza Orozco
                Jorgelina Cueli
                Julie Serrano Lopez
                
                Equipo 6:
                
                Daniela Embus
                Esteban Rojas
                Andres Poblete
                Stiven Molina Gonzalez
                Kevin Martinez
                Sergio Guerrero
                
                Equipo 7:
                
                Maria Elisa Hernandez Martinez
                Jean Carlos Duque
                Esteban Jaramillo
                Wilder de Jesus Lopez
                Dayana
                Ihancker Martinez Torrez`
    )

    throw new StopPropagation()
  }
}
