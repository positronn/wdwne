const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const handlers = require('./lib/handlers')
const app = express()
const port = process.env.PORT || 3000

//                          configuration
//
// configure handlebars view engine
app.engine('handlebars', engine({
  defaultLayout: 'main'
}))
// This creates a view engine and configures Express to use it
// by default.
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({ extended: false }))

//                          routes
//
app.get('/', handlers.home)

app.get('/about', handlers.about)

app.get('/headers', handlers.headers)

app.get('/api/tours', handlers.tours)

app.put('/api/tour/:id', handlers.tourPut)

app.delete('/api/tour/:id', handlers.tourDelete)

// custom 404 page
app.use(handlers.notFound)
// custom 500 page
app.use(handlers.serverError)

//                         raise server
//
if (require.main === module) {
  app.listen(port, () => console.log(
    `Express started on http://localhost:${port}\n` +
    'press ctrl-c to terminate...\n'
  ))
} else {
  module.exports = app
}
