const path = require('path')
const bodyParser = require('body-parser')

const Participante = require('../classes/participante')
const Coord_Cursos = require('../classes/coord_cursos')
const Coord_Recursos = require('../classes/coord_recursos')
const Usuario = require('../classes/usuario')

const connection = require('../database/connection')
const functions = require('../functions/functions')
const client_dir = require('../dir_client')

const app = require('../static/static')

const urlencodedParser = bodyParser.urlencoded({ extended: true })

let dni, nombre, apellidos, email, pass
let user //Declaramos un usuario vacío
let type_user = 0
let is_login = false

app.post('/register', urlencodedParser, (req, res) => {    
    dni = req.body.dni
    nombre = req.body.nombre
    apellidos =  req.body.apellidos
    email = req.body.email

    if(!email.includes('@uco.es')){
        return res.redirect('/error_page')
    }

    pass = ""

    user = new Participante(dni, nombre, apellidos, email, pass)

    functions.send_email_to_admin(email)

    res.redirect('/')
})

app.post('/pass', urlencodedParser, (req, res) => {
    let pass = req.body.pass

    user.contraseña = pass

    if(!user.register()){
        return res.redirect('/error_page')
    }

    functions.send_email_to_user(user.correo_electronico, user.contraseña)

    return res.redirect('/')
})

app.post('/login', urlencodedParser, (req, res) => {
    nombre = req.body.usuario
    let contraseña = req.body.contraseña

    user = new Usuario()

    const querys = [
        `SELECT id_p, nombre_p, mail_p, contrasena_p FROM participantes WHERE nombre_p = '${nombre}' OR mail_p = '${nombre}' AND contrasena_p = '${contraseña}'`,

        `SELECT id_cc, nombre_cc, mail_cc, contrasena_cc FROM coord_cursos WHERE nombre_cc = '${nombre}' OR mail_cc = '${nombre}' AND contrasena_cc = '${contraseña}'`,

        `SELECT id_cr, nombre_cr, mail_cr, contrasena_cr FROM coord_recursos WHERE nombre_cr = '${nombre}' OR mail_cr = '${nombre}' AND contrasena_cr = '${contraseña}'`
    ]

    connection.connect()

    if(nombre && contraseña){
        connection.query(querys.join(';'), (error, rows) => {
            if (error) throw error;

            console.log(rows)

            if(is_in_querys(rows)){
                console.log(type_user)
                switch(type_user){
                    case 0:
                        user = new Participante(rows[0][0].id_p, rows[0][0].nombre_p, '', rows[0][0].mail_p, rows[0][0].contrasena_p)
                        is_login = true
                        return res.redirect('/participant')

                    case 1:
                        user = new Coord_Cursos(rows[1][0].id_cc, rows[1][0].nombre_cc, '', rows[1][0].mail_cc, rows[1][0].contrasena_cc)
                        is_login = true
                        return res.redirect('/coordcursos')
                    
                    case 2:
                        user = new Coord_Recursos(rows[2][0].id_cr, rows[2][0].nombre_cr, '', rows[2][0].mail_cr, rows[2][0].contrasena_cr)
                        is_login = true
                        return res.redirect('/')
                }
            } else {
                console.log("no")
                return res.redirect('/error_page')
            }
        })
    }
})

app.post('/inscribirse', urlencodedParser, (req, res) => {
    let titulo_curso = req.body.titulo_curso
    console.log('Titulo: ' + titulo_curso)

    connection.query(`SELECT id_curso FROM cursos WHERE nombre_curso = '${titulo_curso}'`, (err, rows) => {
        if(err) throw err

        console.log(rows)

        user.id_curso = rows[0].id_curso

        console.log(user.id_curso)

        if(user.inscribirse_curso()){
            res.send('INSCRITO')
        } else {
            res.redirect('/error_page')
        }
    })
})

app.post('/add_cursos', urlencodedParser,(req, res) => {
    let nombre_curso = req.body.nombre_curso
    let descripcion = req.body.descripcion
    let fecha_inicio = req.body.fecha_inicio
    let fecha_fin = req.body.fecha_fin
    let max_inscripciones = req.body.max_inscripciones
    let aula = req.body.aula
    let ponentes = req.body.ponentes


    if(!user.añadir_curso(nombre_curso, fecha_inicio, fecha_fin, max_inscripciones, ponentes, descripcion, aula)){
        return res.redirect('/erro_page')
    }

    return res.redirect('/coordcursos')
})

app.post('/edit_cursos', urlencodedParser,(req, res) => {
    let new_nombre_curso = req.body.new_nombre
    let last_nombre_curso = req.body.last_nombre
    let descripcion = req.body.descripcion
    let fecha_inicio = req.body.fecha_inicio
    let fecha_fin = req.body.fecha_fin
    let max_inscripciones = req.body.max_inscripciones
    let aula = req.body.aula
    let ponentes = req.body.ponentes

    if(!user.editar_curso(new_nombre_curso, last_nombre_curso, fecha_inicio, fecha_fin, max_inscripciones, ponentes, descripcion, aula)){
        return res.redirect('/erro_page')
    }

    return res.redirect('/coordcursos')

})

app.post('/delete_cursos', urlencodedParser,(req, res) => {
    let id_curso = req.body.id_curso

    if(!user.eliminar_curso(id_curso)){
        return res.redirect('/erro_page')
    }

    return res.redirect('/coordcursos')
})

app.get('/', (req, res) => {
    app.set('views', path.join(client_dir))

    is_login = false
    //user = new Usuario

    connection.query('SELECT * FROM cursos', (err, rows) => {
        if(err) throw err

        res.render('index', {cursos: rows})
    })
})

app.get('/participant', (req, res) => {
    app.set('views', path.join(client_dir, '/registered'))

    const querys = [
        'SELECT * FROM cursos',
        `SELECT nombre_p FROM participantes where mail_p = '${nombre}' or nombre_p = '${nombre}'`
    ]

    connection.query(querys.join(';'), (err, rows) => {
        if(err) throw err

        res.render('regist', {cursos: rows[0], nombre: rows[1][0].nombre_p})
    })
})

app.get('/coordcursos', (req, res) => {
    app.set('views', path.join(client_dir, '/coordcursos'))

    const querys = [
        'SELECT * FROM cursos',
        `SELECT nombre_cc FROM coord_cursos where mail_cc = '${nombre}' or nombre_cc = '${nombre}'`
    ]

    connection.query(querys.join(';'), (err, rows) => {
        if(err) throw err

        res.render('coordcur', {cursos: rows[0], nombre: rows[1][0].nombre_cc})
    })
})

app.get('/login_page', (req, res) => {
    res.sendFile(path.join(client_dir, '/inicreg/inicioindex.html'))
})

app.get('/register_page', (req, res) => {
    res.sendFile(path.join(client_dir, '/inicreg/registroindex.html'))
})

app.get('/password', (req, res) => {
    res.sendFile(path.join(client_dir, '/accountset/account.html'))
})

app.get('/page_inscribirse', urlencodedParser, (req, res) => {
    if(!is_login){
        return res.redirect('/login_page')
    }

    res.sendFile(path.join(client_dir, '/inscribirse/inscribirse.html'))
})

app.get('/error_page', (req, res) => {
    res.sendFile(path.join(client_dir, '/error/error.html'))
})

app.get('/add_cursos_form', (req, res) => {
    res.sendFile(path.join(client_dir, '/coordcursos/form_add/form_add.html'))
})

app.get('/edit_cursos_form', (req, res) => {
    res.sendFile(path.join(client_dir, '/coordcursos/form_edit/form_edit.html'))
})

app.get('/delete_cursos_form', (req, res) => {
    res.sendFile(path.join(client_dir, '/coordcursos/form_delete/form_delete.html'))
})

const is_in_querys = (matrix) => {
    for(let i = 0; i<matrix.length; i++){
        if(matrix[i].length !== 0){
            type_user = i
            return true
        }
    }

    return false
}

module.exports = app