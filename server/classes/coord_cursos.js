import Usuario from './usuario.js'

class Coord_Cursos extends Usuario{
    #cursos_disponibles_ = []
    
    constructor(id_usuario, nombre_completo, correo_electronico, contraseña){
        super(id_usuario, nombre_completo, correo_electronico, contraseña)
    }

    añadir_curso(curso){
        for(let i = 0; i<this.#cursos_disponibles_.length; i++){
            if(this.#cursos_disponibles_.at(i) === curso){
                return false
            }
        }

        this.#cursos_disponibles_.push(curso)
        return true
    }

    eliminar_cursos(curso){
        for(let i = 0; i<this.#cursos_disponibles_.length; i++){
            if(this.#cursos_disponibles_.at(i) === curso){
                this.#cursos_disponibles_.slice(i)
                return true
            }
        }

        return false
    }

}

module.exports = Coord_Cursos