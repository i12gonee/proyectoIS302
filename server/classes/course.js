class Course{
    #id_course_
    #init_date_
    #end_date_
    #n_inscriptions_
    #speakers_
    #description_
    #classroom_
    #sources_

    construct(id_course, init_date, end_date, n_inscriptions, speakers, description, classroom, sources,){
        this.#id_course_ = id_course
        this.#init_date_ = init_date
        this.#end_date_ = end_date
        this.#n_inscriptions_ = n_inscriptions
        this.#speakers_ = speakers
        this.#description_ = description
        this.#classroom_ = classroom
        this.#sources_ = sources
    }

    get id_course(){return this.#id_course_}
    get init_date(){return this.#init_date_}
    get end_date(){return this.#end_date_}
    get n_inscriptions(){return this.#n_inscriptions_}
    get speakers(){return this.#speakers_}
    get description(){return this.#description_}
    get classroom(){return this.#classroom_}
    get sources(){return this.#sources_}

    set id_course(id_course){this.#id_course_ = id_course}
    set init_date(init_date){this.#init_date_ = init_date}
    set end_date(end_date){this.#end_date_ = end_date}
    set n_inscriptions(n_inscriptions){this.#n_inscriptions_ = n_inscriptions}
    set speakers(speakers){this.#speakers_ = speakers}
    set description(description){this.#description_ = description}
    set classroom(classroom){this.#classroom_ = classroom}
    set sources(sources){this.#sources_ = sources}
}