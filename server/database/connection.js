const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'proyectois',
    password: 'basededatos_is',
    database: 'bd_is',
    multipleStatements: true,
    dateStrings: true
})

module.exports = connection