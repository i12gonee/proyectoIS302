const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const Usuario = require('./classes/usuario')
const {connection} = require('./database/connection');

const app = express()
const port = 8000

app.use('/', express.static(path.join(__dirname, '../client')))

app.post('/register', urlencodedParser, (req, res) => {
    let dni = req.body.dni
    let nombre = req.body.nombre
    let apellidos =  req.body.apellidos
    let email = req.body.email

    console.log(dni, nombre, apellidos, email)

    const usuario = new Usuario(dni, nombre, apellidos, email, "pasword")

    console.log(usuario)

    usuario.register()
})

app.post('/login', urlencodedParser, (req, res) => {
    let nombre = req.body.usuario
    let contraseña = req.body.contraseña

    console.log(`Usuario: ${nombre}\nContraseña: ${contraseña}`)

    const querys = [
        `SELECT nombre_p, contrasena_p FROM PARTICIPANTES 
            WHERE nombre_p = '${nombre}' AND contrasena_p = '${contraseña}'`,

        `SELECT nombre_cc, contrasena_cc FROM COORD_CURSOS 
            WHERE nombre_cc = '${nombre}' AND contrasena_cc = '${contraseña}'`,

        `SELECT nombre_cr, contrasena_cr FROM COORD_RECURSOS 
            WHERE nombre_cr = '${nombre}' AND contrasena_cr = '${contraseña}'`
    ]

    connection.connect()

    for(let i = 0; i<querys.length; i++){
        connection.query(querys[i], (err, rows) => {
            if(err) throw err
            
            console.log(rows)

            if(rows.length > 0){
                res.redirect('/')
            }  else {
                console.log('no')
            }      
        })
    }

    connection.end()

})

app.listen(port, () => {
    console.log('Listening in http://localhost:'+port)
})