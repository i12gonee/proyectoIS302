const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

const Participante = require('./classes/participante')
const Coord_Cursos = require('./classes/coord_cursos')
const Coord_Recursos = require('./classes/coord_recursos')
const {connection} = require('./database/connection')
const showoverlay = require('../client/inicreg/inicioscript')

const app = express()
const port = 8000
const url = 'http://localhost:' + port
const urlencodedParser = bodyParser.urlencoded({ extended: true })

app.use('/', express.static(path.join(__dirname, '../client')))
app.use('/password', express.static(path.join(__dirname, '../client/accountset')))
app.use('/page_inscribirse', express.static(path.join(__dirname, '../client/accountset')))
app.use('/participant', express.static(path.join(__dirname, '../client/registered')))
app.use('/coordcursos', express.static(path.join(__dirname, '../client/coordcursos')))
app.use('/login_page', express.static(path.join(__dirname, '../client/inicreg')))
app.use('/error_page', express.static(path.join(__dirname, '../client/error')))

app.set('view engine', 'ejs')

let dni, nombre, apellidos, email, pass
let user //Declaramos un usuario vacío
let type_user = 0
let is_login = false
let titulo_curso

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

    send_email(email)

    res.redirect('/')
})

app.post('/pass', urlencodedParser, (req, res) => {
    let pass = req.body.pass

    user.contraseña = pass

    if(!user.register()){
        return res.redirect('/error_page')
    }

    res.redirect('/')
})

app.post('/login', urlencodedParser, (req, res) => {
    nombre = req.body.usuario
    let contraseña = req.body.contraseña

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
    titulo_curso = req.body.titulo_curso
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

app.get('/', (req, res) => {
    app.set('views', path.join(__dirname, '../client'))

    connection.query('SELECT * FROM cursos', (err, rows) => {
        if(err) throw err

        res.render('index', {cursos: rows})
    })
})

app.get('/participant', (req, res) => {
    app.set('views', path.join(__dirname, '../client/registered'))

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
    app.set('views', path.join(__dirname, '../client/coordcursos'))

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
    res.sendFile(path.join(__dirname, '../client/inicreg/inicioindex.html'))
})

app.get('/register_page', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/inicreg/registroindex.html'))
})

app.get('/password', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/accountset/account.html'))
})

app.get('/page_inscribirse', urlencodedParser, (req, res) => {
    if(!is_login){
        return res.redirect('/login_page')
    }

    res.sendFile(path.join(__dirname, '../client/inscribirse/inscribirse.html'))
})

app.get('/error_page', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/error/error.html'))
})

app.listen(port, () => {
    console.log('Listening in ' + url)
})

//---------------ADDITIONAL---------------//
const is_in_querys = (matrix) => {
    for(let i = 0; i<matrix.length; i++){
        if(matrix[i].length !== 0){
            type_user = i
            return true
        }
    }

    return false
}

const send_email = (email) => {
    const html = `<h1>El usuario ${email} quiere registrarse en la web</h1>
                  <h2>Pulse el siguiente enlace para asiganarle una contraseña</h2>
                  <a href = "http://localhost:8000/password">ASIGNAR CONTRASEÑA</a>`
    
    const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 8000,
        service: 'gmail',
        auth: {
            user: 'proyectois302@gmail.com',
            pass: 'jvfxtrudpyefzalr'
        }
    })

    const mailOptions = {
        from: 'proyectois302@gmail.com',
        to: 'proyectois302@gmail.com',
        subject: 'Nuevo registro',
        html: html
    }
    
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) throw err
    
        console.log('Mensaje enviado: ' + info.response)
    })
}
//----------------------------------------//

module.exports = app