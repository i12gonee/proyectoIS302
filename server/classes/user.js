class User{
    //------Private-----
    #id_user_
    #name_
    #mail_
    #password_
    //list of courses?

    //-----Public-----
    constructor(id_user, name, mail, password){
        this.#id_user_ = id_user
        this.#name_ = name
        this.#mail_ = mail
        this.#password_ = password
    }

    get id_user(){return this.#id_user_}
    get name(){return this.#name_}
    get mail(){return this.#mail_}
    get password(){return this.#password_}

    set id_user(id_user){this.#id_user_ = id_user}
    set name(name){this.#name_ = name}
    set mail(mail){this.#mail_ = mail}
    set password(password){this.#password_ = password}

    //operators
    show_courses(){}
}

export default User