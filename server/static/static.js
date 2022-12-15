const path = require('path')

const express = require('express')
const client_dir = require('../dir_client')

const app = express()

//Set static files
app.use('/', express.static(path.join(client_dir)))
app.use('/password', express.static(path.join(client_dir, '/accountset')))
app.use('/page_inscribirse', express.static(path.join(client_dir, '/accountset')))
app.use('/participant', express.static(path.join(client_dir, '/registered')))
app.use('/coordcursos', express.static(path.join(client_dir, '/coordcursos')))
app.use('/coordrecursos', express.static(path.join(client_dir, '/coordrecursos')))
app.use('/add_cursos_form', express.static(path.join(client_dir, '/coordcursos/form_add')))
app.use('/edit_cursos_form', express.static(path.join(client_dir, '/coordcursos/form_edit')))
app.use('/delete_cursos_form', express.static(path.join(client_dir, '/coordcursos/form_delete')))
app.use('/add_recursos_form', express.static(path.join(client_dir, '/coordrecursos/form_add')))
app.use('/edit_recursos_form', express.static(path.join(client_dir, '/coordrecursos/form_edit')))
app.use('/delete_recursos_form', express.static(path.join(client_dir, '/coordrecursos/form_delete')))
app.use('/login_page', express.static(path.join(client_dir, '/inicreg/inicio_sesion')))
app.use('/register_page', express.static(path.join(client_dir, '/inicreg/register')))
app.use('/error_page', express.static(path.join(client_dir, '/error')))

//Set dinamic files
app.set('view engine', 'ejs')

module.exports = app