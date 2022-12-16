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

    const querys = [
        `SELECT * FROM participantes WHERE contrasena_p = '${contraseña}' AND (nombre_p = '${nombre}' OR mail_p = '${nombre}')`,

        `SELECT * FROM coord_cursos WHERE contrasena_cc = '${contraseña}' AND (nombre_cc = '${nombre}' OR mail_cc = '${nombre}')`,

        `SELECT * FROM coord_recursos WHERE contrasena_cr = '${contraseña}' AND (nombre_cr = '${nombre}' OR mail_cr = '${nombre}')`
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
                        return res.redirect('/coordrecursos')
                }
            } else {
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
        return res.redirect('/error_page')
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
    let precio = req.body.precio
    let aula = req.body.aula
    let ponentes = req.body.ponentes

    if(!user.editar_curso(new_nombre_curso, last_nombre_curso, fecha_inicio, fecha_fin, max_inscripciones, precio, ponentes, descripcion, aula)){
        return res.redirect('/error_page')
    }

    return res.redirect('/coordcursos')

})

app.post('/delete_cursos', urlencodedParser,(req, res) => {
    let id_curso = req.body.id_curso

    if(!user.eliminar_curso(id_curso)){
        return res.redirect('/error_page')
    }

    return res.redirect('/coordcursos')
})

app.post('/add_recursos', urlencodedParser,(req, res) => {
    let nombre_recurso = req.body.nombre_recurso
    let tipo_recurso = req.body.tipo
    let id_curso = req.body.id_curso


    if(!user.añadir_recurso(nombre_recurso, tipo_recurso, id_curso)){
        return res.redirect('/error_page')
    }

    return res.redirect('/coordrecursos')
})

app.post('/edit_recursos', urlencodedParser,(req, res) => {
    let new_nombre_recurso = req.body.new_nombre
    let tipo_recurso = req.body.tipo
    let id_recurso = req.body.id_recurso

    if(!user.editar_recurso(new_nombre_recurso, tipo_recurso, id_recurso)){
        return res.redirect('/error_page')
    }

    return res.redirect('/coordrecursos')

})

app.post('/delete_recursos', urlencodedParser,(req, res) => {
    let id_recurso = req.body.id_recurso

    if(!user.eliminar_recurso(id_recurso)){
        return res.redirect('/error_page')
    }

    return res.redirect('/coordrecursos')
})

app.get('/', (req, res) => {
    app.set('views', path.join(client_dir))

    is_login = false
    //user = new Usuario()

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

app.get('/coordrecursos', (req, res) => {
    app.set('views', path.join(client_dir, '/coordrecursos'))

    const querys = [
        'SELECT * FROM recursos',
        `SELECT nombre_cr FROM coord_recursos where mail_cr = '${nombre}' or nombre_cr = '${nombre}'`
    ]

    connection.query(querys.join(';'), (err, rows) => {
        if(err) throw err

        console.log(rows[1]);

        res.render('coordrecursos', {recursos: rows[0], nombre: rows[1][0].nombre_cr})
    })
})

app.get('/login_page', (req, res) => {
    app.set('views', path.join(client_dir, '/inicreg/inicio_sesion'))

    res.render('inicioindex')
})

app.get('/register_page', (req, res) => {
    app.set('views', path.join(client_dir, '/inicreg/register'))

    res.render('registroindex')
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

app.get('/add_recursos_form', (req, res) => {
    res.sendFile(path.join(client_dir, '/coordrecursos/form_add/form_add.html'))
})

app.get('/edit_recursos_form', (req, res) => {
    res.sendFile(path.join(client_dir, '/coordrecursos/form_edit/form_edit.html'))
})

app.get('/delete_recursos_form', (req, res) => {
    res.sendFile(path.join(client_dir, '/coordrecursos/form_delete/form_delete.html'))
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