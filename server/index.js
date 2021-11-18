const express = require('express')
const mongoose = require('mongoose')

const { MONGO_URL, MONGO_OPTIONS, SERVER_PORT } = require('./consts')
const { getRouter, getMiddlewares } = require('./router')


// Init
const server = express()
mongoose.connect(MONGO_URL, MONGO_OPTIONS)

// Get full router and middlewares
getMiddlewares(server)
getRouter(server)

// Start server
server.listen(SERVER_PORT, () => console.log(`SERVER@${SERVER_PORT}`))
