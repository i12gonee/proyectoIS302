import Usuario from './usuario.js'
import Curso from './curso.js'

class Coord_Recursos extends Usuario{
    #recursos_coord_ = []

    constructor(id_usuario, nombre_completo, correo_electronico, contraseña){
        super(id_usuario, nombre_completo, correo_electronico, contraseña)
    }

    añadir_recurso(recurso){
        for(let i = 0; i<this.#recursos_coord_.length; i++){
            if(this.#recursos_coord_.at(i) === recurso){
                return false
            }
        }

        this.#recursos_coord_.push(recurso)
        return true        
    }

    eliminar_recurso(recurso){
        for(let i = 0; i<this.#recursos_coord_.length; i++){
        	if(this.#recursos_coord_.at(i) === recurso){
        		this.#recursos_coord_.slice(i)
        		return true
        	}
        }
        
        return false
    }
    
    modificar_recursos(curso){
    	curso.recursos = this.#recursos_coord_
    }
}

module.exports = Coord_Recursos