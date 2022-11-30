import Usuario from './usuario.js'

class Participante extends Usuario{

    #cursos_ = []

    constructor(id_usuario, nombre_completo, correo_electronico, contraseña){
        super(id_usuario, nombre_completo, correo_electronico, contraseña)
    }

    inscribirse_en_curso(Curso){
        for(let i = 0; i<this.#cursos_.length; i++){
            if(this.#cursos_[i] === Curso){
                return false
            }
        }

        this.#cursos_.push(Curso)
        return true
    }

    ver_historial_cursos(){
        this.#cursos_.forEach(e => {
            console.log(e) //devuelve html mostrando los cursos
        })
    }
}

export default Participante