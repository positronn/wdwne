const env = process.env.NODE_ENV || 'dev'
const credentials = require(`./credentials.${env}.json`)
module.exports = { credentials }
