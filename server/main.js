const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })


const app = express()
const port = 8000

app.use('/', express.static(path.join(__dirname, '../client')))

app.post('/', urlencodedParser, (req, res) => {
    console.log(`Usuario: ${req.body.usuario}\nContraseña: ${req.body.contraseña}`)
})

app.listen(port, () => {
    console.log('Listening in http://localhost:'+port)
})