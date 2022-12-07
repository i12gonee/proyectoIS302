const Usuario = require('./usuario')

class Participante extends Usuario{

    constructor(dni, nombre, apellidos, correo_electronico, contraseña){
        super(dni, nombre, apellidos, correo_electronico, contraseña)
    }
}

module.exports =  Participante