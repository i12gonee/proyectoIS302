const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const Usuario = require('./classes/usuario')

//start server
const app = express()
const port = 8000

app.use('/', express.static(path.join(__dirname, '../client')))

//asignar datos formularios al contructor de Usuario

//register data
app.post('/reg', urlencodedParser, (req, res) => {
    let dni = req.body.dni
    let nombre = req.body.nombre
    let apellidos =  req.body.apellidos
    let email = req.body.email

    console.log(dni, nombre, apellidos, email)

    const usuario = new Usuario(req.body.dni, req.body.nombre, req.body.apellidos, req.body.email, "pasword")

    console.log(usuario)

    usuario.register()
})

app.post('/', urlencodedParser, (req, res) => {
    let nombre = req.body.usuario
    let contraseña = req.body.contraseña

    console.log(`Usuario: ${nombre}\nContraseña: ${contraseña}`)
})

app.listen(port, () => {
    console.log('Listening in http://localhost:'+port)
})

