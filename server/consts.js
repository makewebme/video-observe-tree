const path = require('path')


const ROOT_ABS_PATH = path.resolve(__dirname + '/..')
const SERVER_PORT = 4000
const MONGO_URL = 'mongodb://localhost:27017/video-observe-tree'
const MONGO_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true }

module.exports = {
  ROOT_ABS_PATH,
  SERVER_PORT,
  MONGO_URL,
  MONGO_OPTIONS,
}
