const cors = require('cors')
const bodyParser = require('body-parser')
const expressFormData = require('express-form-data')
const os = require('os')

const apiTreeRouter = require('./tree')
const staticRouter = require('./static')


const getRouter = (server) => {
  server.use('/api/tree', apiTreeRouter)
  server.use('/static', staticRouter)
}

const getMiddlewares = (server) => {
  server.use(expressFormData.parse({
    uploadDir: os.tmpdir(),
    autoClean: true
  }))
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(cors({ origin: '*' }))
}

module.exports = {
  getRouter,
  getMiddlewares,
}
