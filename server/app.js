const app = require('./routes/routes')

const port = 8000
const url = 'http://localhost:' + port

app.listen(port, () => {
    console.log('Listening in ' + url)
})