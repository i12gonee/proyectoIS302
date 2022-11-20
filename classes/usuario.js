class Usuario{
    //------Private-----
    #id_usuario_
    #nombre_completo_
    #correo_electronico_
    #contraseña_

    //-----Public-----
    constructor(id_usuario, nombre_completo, correo_electronico, contraseña){
        this.#id_usuario_ = id_usuario
        this.#nombre_completo_ = nombre_completo
        this.#correo_electronico_ = correo_electronico
        this.#contraseña_ = contraseña
    }

    get id_usuario(){return this.#id_usuario_}
    get nombre_completo(){return this.#nombre_completo_}
    get correo_electronico(){return this.#correo_electronico_}
    get contraseña(){return this.#contraseña_}

    set id_usuario(id_usuario){this.#id_usuario_ = id_usuario}
    set nombre_completo(nombre_completo){this.#nombre_completo_ = nombre_completo}
    set correo_electronico(correo_electronico){this.#correo_electronico_ = correo_electronico}
    set contraseña(contraseña){this.#contraseña_ = contraseña}
}

export default Usuario