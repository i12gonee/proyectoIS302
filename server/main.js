const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const mysql = require('mysql2')
const Usuario = require('./classes/usuario.js')

//start server
const app = express()
const port = 8000
const usuario = new Usuario("")

//connect to database (local)
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'i12almuf',
    password: 'basededatos_is',
    database: 'bd_is'
})

app.use('/', express.static(path.join(__dirname, '../client')))

//asignar datos formularios al contructor de Usuario

app.listen(port, () => {
    console.log('Listening in http://localhost:'+port)
})

