const fortune = require('./fortune')
const tours = require('./tours')

const theTours = tours.getTours()


exports.home = (req, res) =>
  res.render('home')

exports.about = (req, res) =>
  res.render('about', { fortune: fortune.getFortune() })

exports.notFound = (req, res) =>
  res.render('404')

exports.headers = (req, res) => {
  res.type('text/plain')
  const headers = Object.entries(req.headers)
    .map(([key, value]) => `${key}: ${value}`)
  res.send(headers.join('\n'))
}

exports.tours = (req, res) => {
  const toursXml = '<?xml version="1.0"?><tours>' +
  theTours.map(p => 
      `<tour price="${p.price}" id="${p.id}">${p.name}</tour>`
    ).join(' ') + '</tours>'
  const toursText = theTours.map(p =>
    `${p.id}: ${p.name} (${p.price})`
    ).join('\n')
  res.format({
      'application/json': () => res.json(theTours),
      'application/xml': () => res.type('application/xml').send(toursXml),
      'text/xml': () => res.type('text/xml').send(toursXml),
      'text/plain': () => res.type('text7plain').send(toursText)
  })
}

exports.tourPut = (req, res) => {
  const p = theTours.find(p => p.id === parseInt(req.params.id))
  if (!p)
    return res.status(404).json({ error: 'No such tour exists' })
  if (req.body.name)
    p.name = req.body.name
  if (req.body.price)
    p.price = req.body.price
  res.json({ success: true })
}

exports.tourDelete = (req, res) => {
  const idx = theTours.findIndex(tour => tour.id === parseInt(req.params.id))
  if (idx < 0)
    return res.json({ error: 'No such tour exists.' })
  theTours.splice(idx, 1)
  res.json({ success: true })
}

// Express recognizes the error handler by way of its four
// arguments, so we have to disable ESLint's no-unused-vars rule
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) =>
  res.render('500')
/* eslint-enable no-unused-vars */
